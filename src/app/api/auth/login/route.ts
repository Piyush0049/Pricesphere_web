import { NextRequest, NextResponse } from 'next/server';
import User from '@/db/models/userModel';
import { setCookie } from '@/utils/setCookie';
import ConnectToDB from '@/db/db';

export async function POST(req: NextRequest) {
  try {
    await ConnectToDB();
    const body = await req.json();
    const { email, password } = body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'Email not registered' }, { status: 404 });
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return NextResponse.json({ message: 'Wrong password' }, { status: 400 });
    }

    // Create the response first
    const response = NextResponse.json(
      { message: 'Login success', user, success : true },
      { status: 200 }
    );

    // Set the cookie
    setCookie({
      user,
      response,
      message: 'Login Success',
      statusCode: 200,
    });

    return response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
