// src/app/api/auth/verification/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import OTPModel from '@/db/models/otpModal';
import User from '@/db/models/userModel';
import sendMail from '@/utils/sendMail';
import ConnectToDB from '@/db/db';

export async function POST(request: NextRequest) {
  await ConnectToDB();
  try {
    const { otp } = await request.json();
    const email = request.cookies.get('email')?.value;
    console.log(`Verifying OTP for ${email}`);

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email cookie not found' },
        { status: 400 }
      );
    }

    const otpRecord = await OTPModel.findOne({ email });
    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: 'OTP not found' },
        { status: 404 }
      );
    }

    const hashedOtp = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');
    if (
      hashedOtp !== otpRecord.otp ||
      otpRecord.expiresAt < new Date()
    ) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Create the new user; pre("save") will hash password
    const newUserData = otpRecord.newUser;
    const user = await User.create(newUserData);
    await OTPModel.deleteOne({ email });

    // Issue JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const isProduction = process.env.NODE_ENV === 'production';
    const domain = isProduction
      ? process.env.COOKIE_DOMAIN!    // e.g. ".yourapp.com"
      : 'localhost';

    // Build safe user object
    const safeUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      mode: user.mode,
      avatar: user.avatar,
      badges: user.badges,
      createdAt: user.createdAt,
    };

    const response = NextResponse.json(
      {
        success: true,
        message: 'Verification successful',
        user: safeUser,
        token,
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      domain,
    });

    // Send welcome email
    const templatePath = path.resolve(
      process.cwd(),
      'src/utils/templates/emailTemplate.html'
    );
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    htmlContent = htmlContent.replace('{{name}}', user.username || user.email);
    htmlContent = htmlContent.replace(
      '{{otp_code}}',
      'Your email has been successfully verified!'
    );

    await sendMail({
      email,
      subject: 'Email Verification Successful',
      message: htmlContent,
      tag: 'verification',
    });

    return response;
  } catch (error: unknown) {
    console.error('Verification error:', error);
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
