import { createSlice } from "@reduxjs/toolkit";

// my slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export const productsSelector = (state) => state.productsSlice.products;

export default productsSlice.reducer;
