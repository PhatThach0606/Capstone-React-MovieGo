import HomeTemplate from "../MyProject/HomeTemplate";
import DetailMovie from "../MyProject/HomeTemplate/DetailMovie";
import Homepage from "../MyProject/HomeTemplate/HomePage";
import ListMovie from "../MyProject/HomeTemplate/ListMovie";
import AdminTemplate from "../MyProject/AdminTemplate";
import Dashboard from "../MyProject/AdminTemplate/Dashboard";
import Adminpage from "../MyProject/AdminTemplate/AdminPage";
import AuthPage from "../MyProject/AdminTemplate/AuthPage";
import { Route } from "react-router-dom";

export const routes = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      { path: "", element: Homepage },
      { path: "list-movie", element: ListMovie },
      { path: "detail/:id", element: DetailMovie, hiddenNav: true },
    ],
  },

  {
    path: "admin",
    element: AdminTemplate,
    nested: [
      { path: "dashboard", element: Dashboard },
      { path: "add-user", element: Adminpage },
    ],
  },

  {
    path: "auth",
    element: AuthPage,
  },
];

export const renderRoutes = () => {
  // logic
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route path={item.path} element={<item.element />} />
          ))}
        </Route>
      );
    } else {
      return <Route path={route.path} element={<route.element />} />;
    }
  });
};
