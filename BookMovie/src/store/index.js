import { configureStore } from "@reduxjs/toolkit";
import AuthenReducer from "./../MyProject/AdminTemplate/authentication/slice";
import ManaReducer from "../MyProject/AdminTemplate/ListUser/slice";
import AdminPageReducer from "./../MyProject/AdminTemplate/adminPage/slice";
import AddFilmReducer from "./../MyProject/AdminTemplate/AddFilm/slice";
import SystemTheaterReducer from "./../MyProject/AdminTemplate/addCalender/HethongRap";
import GroupTheatherReducer from "./../MyProject/AdminTemplate/addCalender/CumRapTheoHeThong";
import DeleteMovieReducer from "./../MyProject/AdminTemplate/adminPage/deletefilm";
import CalenderReducer from "./../MyProject/AdminTemplate/addCalender/TaoLichChieu";
import listMovieReducer from "./../MyProject/HomeTemplate/ListMovie/slice";
import detailReducer from "./../MyProject/HomeTemplate/DetailMovie/slice";
import EditFilmReducer from "./../MyProject/AdminTemplate/EditPhim/slice";
import DeleteUserReducer from "./../MyProject/AdminTemplate/User/slice";
import EditUserReducer from "./../MyProject/AdminTemplate/EditUser/slice";
import AddUserReducer from "./../MyProject/AdminTemplate/AddUser/slice";
<<<<<<< HEAD
import SignUpReducer from "./../MyProject/HomeTemplate/SignUp/slice";
import SignInReducer from "./../MyProject/HomeTemplate/SignIn/slice";
import { bookTicketReducer } from "./../MyProject/HomeTemplate/BookTicket/slice";
// import { BookTicketReducer } from "../MyProject/HomeTemplate/BookTicket/slice";
=======
import SearchUserReducer from "./../MyProject/AdminTemplate/ListUser/Search";
>>>>>>> ea06afd461a3f95e01152dbdc61183a92a484ea2
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
    EditFilmReducer,
    DeleteUserReducer,
    EditUserReducer,
    AddUserReducer,
<<<<<<< HEAD
    SignUpReducer,
    SignInReducer,
    bookTicketReducer,
    // BookTicketReducer,
=======
    SearchUserReducer,
>>>>>>> ea06afd461a3f95e01152dbdc61183a92a484ea2
  },
});
