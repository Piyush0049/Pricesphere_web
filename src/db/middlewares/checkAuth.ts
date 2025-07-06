import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '@/db/models/userModel';
import ConnectToDB from '@/db/db';

export const checkAuth = async (req: NextRequest) => {
  try {
    await ConnectToDB();

    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Login First' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json({ message: 'JWT Secret not defined' }, { status: 500 });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user) throw new Error('User not found');

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Auth Error:', error.message);
    } else {
      console.error('Auth Error:', error);
    }
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
};
