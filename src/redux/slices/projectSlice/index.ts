
import { createSlice } from "@reduxjs/toolkit";
// Or define it inline
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

export interface ProjectProps {
  projects: Product[] | null;
}

const initialState: ProjectProps = {
  projects: null,
};

export const projectSlice = createSlice({
  name: "projects",     
  initialState,
  reducers: {
    projects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { projects } = projectSlice.actions;

export default projectSlice.reducer;
