import mongoose, { Document, Schema } from 'mongoose';

export interface IFavoriteProduct {
  name: string;
  price: string;
  image: string;
  website: string;
  link: string
}

export interface IFavorite extends Document {
  userId: string;
  product: IFavoriteProduct;
}

const FavoriteProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  website: { type: String, required: true },
  link: { type: String, required: true }
});

const FavoriteSchema: Schema = new Schema({
  userId: { type: String, required: true },
  product: { type: FavoriteProductSchema, required: true },
}, { timestamps: true });

const Favorite = mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', FavoriteSchema);

export default Favorite;