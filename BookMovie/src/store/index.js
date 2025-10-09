import { configureStore } from "@reduxjs/toolkit";
import AuthenReducer from "./../MyProject/AdminTemplate/authentication/slice";
import ManaReducer from "./../MyProject/AdminTemplate/_components/Navbar/slice";
import AdminPageReducer from "./../MyProject/AdminTemplate/adminPage/slice";
import AddFilmReducer from "./../MyProject/AdminTemplate/AddFilm/slice";
import SystemTheaterReducer from "./../MyProject/AdminTemplate/addCalender/HethongRap";
import GroupTheatherReducer from "./../MyProject/AdminTemplate/addCalender/CumRapTheoHeThong";
import DeleteMovieReducer from "./../MyProject/AdminTemplate/adminPage/deletefilm";
import CalenderReducer from "./../MyProject/AdminTemplate/addCalender/TaoLichChieu";
import listMovieReducer from "./../MyProject/HomeTemplate/ListMovie/slice";
import detailReducer from "./../MyProject/HomeTemplate/DetailMovie/slice";
export const store = configureStore({
  reducer: {
    AuthenReducer,
    ManaReducer,
    AdminPageReducer,
    AddFilmReducer,
    SystemTheaterReducer,
    GroupTheatherReducer,
    DeleteMovieReducer,
    CalenderReducer,
    listMovieReducer,
    detailReducer,
  },
});
