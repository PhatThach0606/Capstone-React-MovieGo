import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./MyProject/HomeTemplate";
import AdminTemplate from "./MyProject/AdminTemplate";
import AdminPage from "./MyProject/AdminTemplate/adminPage";
import ListMovie from "./MyProject/HomeTemplate/ListMovie";
import Homepage from "./MyProject/HomeTemplate/HomePage";
import DetailMovie from "./MyProject/HomeTemplate/DetailMovie";
import Authentication from "./MyProject/AdminTemplate/authentication";
import Calendar from "./MyProject/AdminTemplate/Calender";
import AddNewFilm from "./MyProject/AdminTemplate/AddFilm";
import AddCalender from "./MyProject/AdminTemplate/addCalender";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* HomeTemplate  */}
          <Route path="" element={<HomeTemplate />}>
            <Route path="" element={<Homepage />} />
            <Route path="list-movie" element={<ListMovie />} />
            <Route path="detail/:id" element={<DetailMovie />} />
          </Route>

          {/* AdminTemplate  */}
          <Route path="admin" element={<AdminTemplate />}>
            <Route path="adminpage" elemen={<AdminPage />} />
          </Route>
          {/* Authen  */}
          <Route path="auth" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
