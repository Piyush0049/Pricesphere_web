// src/app/api/init/route.ts
import { NextResponse } from 'next/server';
import '@/utils/entry'; // ✅ Will now be included in the build

export async function GET() {
  return NextResponse.json({ success: true });
}
