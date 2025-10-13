import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { actionLogout } from "./../../authentication/slice";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.AuthenReducer.data);

  const renderUser = () => {
    const user = data || JSON.parse(localStorage.getItem("ADMIN_INFOR"));
    if (!user) return null;

    return (
      <div className="text-white hidden md:flex items-center">
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <div className="flex justify-center items-center w-8 h-8 rounded-full border border-white">
            <i className="fa-solid fa-user text-sm"></i>
          </div>
          <div className="text-sm">
            <div>{user?.email || "User Admin"}</div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const userFromLS = localStorage.getItem("ADMIN_INFOR");
    if (!data && !userFromLS) navigate("/auth");
  }, [data, navigate]);

  return (
    <nav className="bg-[#0F172A] shadow-md sticky top-0 z-50 w-full h-20">
      <div className="flex justify-between items-center mx-auto p-3 sm:p-4 lg:px-8">
        {/* Nút mở sidebar khi nhỏ */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="text-white focus:outline-none p-1 border rounded block lg:hidden"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>

          <h1 className="text-white font-bold whitespace-nowrap text-base md:text-xl lg:text-2xl xl:text-3xl">
            Quản lý phim và Người dùng
          </h1>
        </div>

        {/* Bên phải */}
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
          {renderUser()}

          <NavLink
            to="/"
            className="hidden sm:block text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br font-medium rounded-md text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 transition duration-200"
          >
            Home
          </NavLink>

          <button
            onClick={() => dispatch(actionLogout())}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-md text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-2 transition duration-200"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}
