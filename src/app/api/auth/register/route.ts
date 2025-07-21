import { NextRequest, NextResponse } from 'next/server';
import User from '@/db/models/userModel';
import OTPModel from '@/db/models/otpModal';
import sendMail from '@/utils/sendMail';
import generateOTP from '@/utils/generateOTP';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { serialize } from 'cookie';
import ConnectToDB from '@/db/db';

export async function POST(request: NextRequest) {
  await ConnectToDB();
  try {
    const { username, email, password, confirmPassword } = await request.json();

    const existingUserEmail = await User.findOne({ email });
    const existingUserUserName = await User.findOne({ username });

    if (existingUserEmail || existingUserUserName) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, message: 'Passwords do not match!' }, { status: 400 });
    }

    const OTP = generateOTP();

    const templatePath = path.resolve(process.cwd(), 'public', 'templates', 'emailTemplate.html');
    let emailContent = fs.readFileSync(templatePath, 'utf-8');
    emailContent = emailContent.replace('{{name}}', username);
    emailContent = emailContent.replace('{{otp_code}}', OTP);

    await sendMail({
      email,
      subject: 'OTP Verification',
      message: emailContent,
      tag: 'otp',
    });

    const hashedOTP = crypto.createHash('sha256').update(OTP).digest('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTPModel.findOneAndUpdate(
      { email },
      {
        otp: hashedOTP,
        expiresAt,
        newUser: { username, email, password },
      },
      { upsert: true, new: true }
    );

    const serialized = serialize('email', email, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      // domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost',
      maxAge: 10 * 60, // 10 minutes
    });

    const response = NextResponse.json({
      success: true,
      message: `Verification OTP sent to ${email}`,
    });

    response.headers.set('Set-Cookie', serialized);

    return response;

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
