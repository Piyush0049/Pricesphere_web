// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log("sknom");

    const email = req.cookies.get('email')?.value;

    const body = await req.json();

    if (!email) {
      throw new Error("Email not found in cookies");
    }

    const updatedBody = { ...body, email };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBody),
        credentials: "include",
        cache: "no-store",
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const { token, ...userData } = data;

    const res = NextResponse.json(userData);

    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      //domain: process.env.NODE_ENV === 'production' ? 'pricesphere.vercel.app' : 'localhost',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      expires: new Date('9999-12-31T23:59:59Z')
    });

    return res;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStatus = (error as { response?: { status: number } }).response?.status || 500;
    return NextResponse.json({ message: errorMessage }, { status: errorStatus });
  }
}
