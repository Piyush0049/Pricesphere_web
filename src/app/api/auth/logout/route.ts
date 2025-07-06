import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import ConnectToDB from '@/db/db';

export async function DELETE() {
  await ConnectToDB();
  const cookie = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    expires: new Date(0), // Invalidate the cookie
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost',
  });

  const response = new NextResponse(
    JSON.stringify({ success: true, message: 'Logged out' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    }
  );

  return response;
}
