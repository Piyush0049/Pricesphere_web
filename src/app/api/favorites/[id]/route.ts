import { NextRequest, NextResponse } from 'next/server';
import ConnectToDB from '@/db/db';
import Favorite from '@/db/models/Favorite';
import jwt from 'jsonwebtoken';

ConnectToDB();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const link = params.id; // Get the product ID from the URL parameters

    if (!link) {
      return NextResponse.json({ message: 'Product ID is required.' }, { status: 400 });
    }

    const token = request.cookies.get('token')?.value || '';
    if (!token) {
      return NextResponse.json({ message: 'Authentication token missing.' }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decodedToken.id;

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
    }

    // Delete the favorite product using userId and product.link (which is productId)
    const result = await Favorite.deleteOne({ userId, 'product.link': link });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Favorite product not found or not authorized.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product removed from favorites.' }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}