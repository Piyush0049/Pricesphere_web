
import { createSlice } from "@reduxjs/toolkit";

export interface ProjectProps {
  projects: any | null;
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
