import { NextRequest, NextResponse } from 'next/server';
import OTPModel from '@/db/models/otpModal';
import sendMail from '@/utils/sendMail';
import generateOTP from '@/utils/generateOTP';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import ConnectToDB from '@/db/db';

export async function POST(request: NextRequest) {
  await ConnectToDB();
  try {
    const { email } = await request.json();

    const otpRecord = await OTPModel.findOne({ email });
    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const OTP = generateOTP();

    const templatePath = path.resolve(process.cwd(), 'public', 'templates', 'emailTemplate.html');

    let emailContent = fs.readFileSync(templatePath, 'utf-8');
    emailContent = emailContent.replace('{{name}}', otpRecord.newUser.username);
    emailContent = emailContent.replace('{{otp_code}}', OTP);

    await sendMail({
      email,
      subject: 'OTP for Verification',
      message: emailContent,
      tag: 'otp',
    });

    otpRecord.otp = crypto.createHash("sha256").update(OTP).digest("hex");
    otpRecord.expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await otpRecord.save();

    return NextResponse.json({
      success: true,
      message: `OTP resent successfully to ${email}`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
