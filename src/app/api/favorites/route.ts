import { NextRequest, NextResponse } from 'next/server';
import ConnectToDB from '@/db/db';
import Favorite from '@/db/models/Favorite';
import jwt from 'jsonwebtoken';

ConnectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { product } = reqBody;
    console.log(product);

    const token = request.cookies.get('token')?.value || '';
    if (!token) {
      return NextResponse.json({ message: 'Authentication token missing.' }, { status: 401 });
    }
    console.log(process.env.JWT_SECRET)
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = decodedToken.id;

    if (!userId || !product) {
      return NextResponse.json({ message: 'User ID and product are required.' }, { status: 400 });
    }

    // Check if the product is already favorited by the user
    const existingFavorite = await Favorite.findOne({ 'userId': userId, 'product.link': product.link });

    if (existingFavorite) {
      // If already favorited, remove it
      await Favorite.deleteOne({ _id: existingFavorite._id });
      return NextResponse.json({ message: 'Product removed from favorites.' }, { status: 200 });
    } else {
      // If not favorited, add it
      const newFavorite = new Favorite({
        userId,
        product,
      });
      await newFavorite.save();
      return NextResponse.json({ message: 'Product added to favorites.' }, { status: 201 });
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || '';
    if (!token) {
      return NextResponse.json({ message: 'Authentication token missing.' }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!); // Use TOKEN_SECRET
    const userId = decodedToken.id;

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
    }

    const favorites = await Favorite.find({ userId });
    console.log(favorites);
    if (!favorites || favorites.length === 0) {
      return NextResponse.json({ message: 'No favorite products found for this user.' }, { status: 404 });
    }

    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
