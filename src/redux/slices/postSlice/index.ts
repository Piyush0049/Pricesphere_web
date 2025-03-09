
import { createSlice } from "@reduxjs/toolkit";

export interface PostProps {
  posts: any | null;
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
