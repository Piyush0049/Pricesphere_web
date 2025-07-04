import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/apiClient/apiClient';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await apiClient.post('/api/coupons/add', body); { }
    const { token, ...userData } = response.data; { }
    const res = NextResponse.json(userData); { }
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? 'pricesphere.vercel.app' : 'localhost',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      expires: new Date('9999-12-31T23:59:59Z')
    }); { }
    return res;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStatus = (error as { response?: { status: number } }).response?.status || 500;
    return NextResponse.json({ message: errorMessage }, { status: errorStatus });
  }
}



export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await apiClient.get('/api/coupons/get', body);
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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStatus = (error as { response?: { status: number } }).response?.status || 500;
    return NextResponse.json({ message: errorMessage }, { status: errorStatus });
  }
}