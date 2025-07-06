import { NextRequest, NextResponse } from 'next/server';
import ConnectToDB from '@/db/db';
import Coupon from '@/db/models/couponModel';

export async function GET(req: NextRequest) {
  try {
    await ConnectToDB();

    const { searchParams } = new URL(req.url);
    const website = searchParams.get('website') || undefined;
    const query = website ? { website } : {};

    const coupons = await Coupon.find(query);

    return NextResponse.json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      message,
      error: message,
    }, { status: 500 });
  }
}
