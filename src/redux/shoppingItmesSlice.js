import { createSlice } from "@reduxjs/toolkit";

// my slice
const addItems = createSlice({
  name: "addItems",
  initialState: {
    shoppingItems: [],
  },
  reducers: {
    setAddItems: (state, action) => {
      state.shoppingItems = action.payload;
    },
    setAddExistingShoppingItem: (state, action) => {
      state.shoppingItems = [...state.shoppingItems, action.payload];
    },
  },
});

export const { setAddItems, setAddExistingShoppingItem } = addItems.actions;
export const addItemsSelector = (state) => state.addItems.shoppingItems;


export default addItems.reducer;
