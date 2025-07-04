import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'axios';

import apiClient from '@/apiClient/apiClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await apiClient.post('/api/google/auth', body);

    const { token, ...userData } = response.data;

    const res = NextResponse.json(userData);

    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? 'pricesphere.vercel.app' : 'localhost',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      expires: new Date('9999-12-31T23:59:59Z')
    });

    return res;
  } catch (error) {
    const axiosError = error as AxiosError;

    return NextResponse.json(
      { message: axiosError.message },
      { status: axiosError.response?.status || 500 }
    );
  }
}
