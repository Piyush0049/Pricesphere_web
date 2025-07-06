import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '@/db/models/userModel';
import ConnectToDB from '@/db/db';

export async function POST(request: NextRequest) {
  await ConnectToDB();
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Invalid token received or has expired!' },
        { status: 400 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, message: 'JWT secret not defined' },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid token or user does not exist!' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        isValidToken: true,
        message: 'Token verified successfully!',
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
