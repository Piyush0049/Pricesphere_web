import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import ConnectToDB from '@/db/db';
import Coupon from '@/db/models/couponModel';
import { ICoupon } from '@/db/models/couponModel';

export async function POST(request: NextRequest) {
  try {
    await ConnectToDB();

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { message: 'API key is required as a query parameter.' },
        { status: 400 }
      );
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_PYTHON_API}/coupons?key=${key}`);
    const data = response.data as ICoupon[];

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: 'No coupons found in external API' },
        { status: 404 }
      );
    }

    const coupons = data.map((coupon) => ({
      name: coupon.name,
      highlight: coupon.highlight,
      details: coupon.details,
      code: coupon.code,
      expired: coupon.expired || 'not',
      website: coupon.website,
    }));

    const insertedCoupons = await Coupon.insertMany(coupons);

    return NextResponse.json(
      { message: 'Coupons added successfully', data: insertedCoupons },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching or saving coupons:', error);
    return NextResponse.json(
      {
        message: 'Error processing coupons',
        error: message,
      },
      { status: 500 }
    );
  }
}
