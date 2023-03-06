import { createSlice } from "@reduxjs/toolkit";

// my slice
const addOne = createSlice({
  name: "add",
  initialState: {
    add: 0,
  },
  reducers: {
    setaddOne: (state, action) => {
      state.add += action.payload;
    },
  },
});

export const { setaddOne } = addOne.actions;
export const addOneSelector = (state) => state.addOne.add;

export default addOne.reducer;
