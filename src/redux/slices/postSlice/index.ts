
import { createSlice } from "@reduxjs/toolkit";

type Product = {
  name: string;
  price: string;
  image: string;
  website: string;
  link: string;
  category?: string;
  rating?: string;
  delivery: string[];
  noofrate: string;
};

export interface PostProps {
  posts: Product[] | null;
}

const initialState: PostProps = {
  posts: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsData: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { postsData } = postSlice.actions;

export default postSlice.reducer;
