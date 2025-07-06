// utils/setCookie.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import IUser from '@/db/models/types/IUser';

interface SetCookieParams {
  user: IUser;
  response: NextResponse;
  message: string;
  statusCode: number;
}

export const setCookie = ({ user, response, message, statusCode }: SetCookieParams) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  const isProduction = process.env.NODE_ENV === 'production';

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: isProduction,
    path: '/',
    // domain: isProduction ? '.vercel.app' : 'localhost',
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60,
  });

  response.headers.set('X-Auth-Message', message);
  response.headers.set('X-Auth-Status', statusCode.toString());
};
