import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
    company: string[];
    minPrice: number;
    maxPrice: number;
    sortBy: string;
};

const initialState: FiltersState = {
    company: [],
    minPrice: 0,
    maxPrice: 200000,
    sortBy: "",
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCompany(state, action: PayloadAction<string[]>) {
            state.company = action.payload;
        },
        setPriceRange(state, action: PayloadAction<{ minPrice: number; maxPrice: number }>) {
            state.minPrice = action.payload.minPrice;
            state.maxPrice = action.payload.maxPrice;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
    },
});

export const { setCompany, setPriceRange, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;
