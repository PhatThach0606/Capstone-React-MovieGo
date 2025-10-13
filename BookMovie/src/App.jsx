import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./MyProject/HomeTemplate";
import AdminTemplate from "./MyProject/AdminTemplate";
import AdminPage from "./MyProject/AdminTemplate/adminPage";
import ListMovie from "./MyProject/HomeTemplate/ListMovie";
import Homepage from "./MyProject/HomeTemplate/HomePage";
import Authentication from "./MyProject/AdminTemplate/authentication";

import AddNewFilm from "./MyProject/AdminTemplate/AddFilm";
import AddCalender from "./MyProject/AdminTemplate/addCalender";
import EditFilm from "./MyProject/AdminTemplate/EditPhim";
import ListUser from "./MyProject/AdminTemplate/ListUser";
import AddUser from "./MyProject/AdminTemplate/AddUser";
import EditUser from "./MyProject/AdminTemplate/EditUser";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* HomeTemplate  */}
          <Route path="" element={<HomeTemplate />}>
            <Route path="" element={<Homepage />} />
            <Route path="list-movie" element={<ListMovie />} />
          </Route>

          {/* AdminTemplate  */}
          <Route path="admin" element={<AdminTemplate />}>
            <Route path="adminpage" element={<AdminPage />} />
            <Route path="addfilm" element={<AddNewFilm />} />
            <Route path="addcalender" element={<AddCalender />} />
            <Route path="edit" element={<EditFilm />} />
            <Route path="list-user" element={<ListUser />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="edit-user" element={<EditUser />} />
          </Route>
          {/* Authen  */}
          <Route path="auth" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
