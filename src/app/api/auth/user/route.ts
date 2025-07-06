import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/db/middlewares/checkAuth';
import User from '@/db/models/userModel';
import ConnectToDB from '@/db/db';

export async function GET(req: NextRequest) {
  try {
    await ConnectToDB();
    const authUser = await checkAuth(req);
    if (authUser instanceof NextResponse) {
      return authUser;
    }

    const user = await User.findById(authUser._id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
