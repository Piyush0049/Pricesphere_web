// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

import apiClient from '@/apiClient/apiClient';

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const response = await apiClient.post('/api/auth/login', body);
    
    const { token, ...userData } = response.data;
    
    const res = NextResponse.json(userData);
    
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      expires: new Date('9999-12-31T23:59:59Z')
    });
    
    return res;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStatus = (error as { response?: { status: number } }).response?.status || 500;
    return NextResponse.json({ message: errorMessage }, { status: errorStatus });
  }
}
