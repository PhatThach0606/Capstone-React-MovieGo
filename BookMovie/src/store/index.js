import { configureStore } from "@reduxjs/toolkit";
import listMovieReducer from "./../MyProject/HomeTemplate/ListMovie/slice";
import detailReducer from "./../MyProject/HomeTemplate/DetailMovie/slice";

export const store = configureStore({
  reducer: {
    listMovieReducer,
    detailReducer,
  },
});
