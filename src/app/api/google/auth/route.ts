import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import ConnectToDB from '@/db/db';
import User from '@/db/models/userModel';
import { generateUsername } from '@/utils/generateUsername';
import { setCookie } from '@/utils/setCookie';

export async function POST(request: NextRequest) {
  try {
    await ConnectToDB();

    const body = await request.json();
    const access_token = body.access_token;

    if (!access_token) {
      return NextResponse.json({ message: 'No access token provided' }, { status: 400 });
    }

    const [tokenInfoRes, userInfoRes] = await Promise.all([
      axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`),
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`),
    ]);

    const tokenInfo = tokenInfoRes.data;
    const userData = userInfoRes.data;

    if (!tokenInfo || !userData) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const { email, name } = userData;

    if (!email) {
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const username = await generateUsername();
      user = await User.create({ name, email, username });
    }

    const response = NextResponse.json(
      { message: 'Login Success', user },
      { status: 200 }
    );

    setCookie({
      user,
      response,
      message: 'Login Success',
      statusCode: 200,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Google Auth Error:', error.message);
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    console.error('Unknown Google Auth Error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
