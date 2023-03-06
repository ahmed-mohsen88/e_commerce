import { createSlice } from "@reduxjs/toolkit";

// my slice
const filterationSlice = createSlice({
  name: "filter",
  initialState: {
    filter: {
      color: {
        Red: false,
        Blue: false,
        Green: false,
        Black: false,
      },
      gender: {
        Men: false,
        Women: false,
      },
      price: {
        250: false,
        450: false,
        451: false,
      },
      type: {
        Polo: false,
        Hoodie: false,
        Basic: false,
      },
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterationSlice.actions;
export const filterSelector = (state) => state.filterationSlice.filter;

export default filterationSlice.reducer;
