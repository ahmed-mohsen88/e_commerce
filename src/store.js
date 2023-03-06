import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./redux/mainSlice";
import addOne from "./redux/addSlice";
import addItems from "./redux/shoppingItmesSlice";
import filterationSlice from "./redux/filterSlice";

const store = configureStore({
  reducer: {
    productsSlice: productsSlice,
    addOne: addOne,
    addItems: addItems,
    filterationSlice: filterationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
