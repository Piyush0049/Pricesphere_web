import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = NextResponse.json({ message: 'Logged Out' });

    res.cookies.set('token', '', {
      httpOnly: true,
      path: '/',
      //domain: process.env.NODE_ENV === 'production' ? 'pricesphere.vercel.app' : 'localhost',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      expires: new Date(0),
    });

    return res;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStatus = (error as { response?: { status: number } }).response?.status || 500;
    return NextResponse.json({ message: errorMessage }, { status: errorStatus });
  }
}
