import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { actionLogout } from "./../../authentication/slice";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const data = useSelector((state) => state.AuthenReducer.data);
  const renderUser = () => {
    const user = JSON.parse(localStorage.getItem("ADMIN_INFOR"));
    return (
      <div className="text-white">
        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-center text-white  w-10 h-10 rounded-[100%] border border-xl-white items-center">
            <i className="fa-solid fa-user text-xl "></i>
          </div>
          <div>
            <div>{user?.email}</div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!data) {
      Navigate("/auth");
    }
  }, [data, Navigate]);

  return (
    <div>
      <nav className=" bg-[#0F172A] ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 px-15 border border-b-grey-600 z-10">
          <div className="h-15 text-center  items-center leading-15">
            <h1 className=" text-3xl font-bold text-white pt-3">
              Quản lý phim và Người dùng
            </h1>
          </div>
          <div className="md:flex md *::flex-wrap md:justify-between md:items-center grid sm:grid-col-1 ">
            {renderUser()}
            <div className="sm:pl-5  md:pl-10 row-span-1 pt- md:pt-0">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                <NavLink to="/">Home</NavLink>
              </button>
            </div>
            <div className="col-span-1  flex items-center space-x-6 rtl:space-x-reverse">
              <a
                href="#"
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                <button
                  onClick={() => {
                    dispatch(actionLogout());
                  }}
                  type="button"
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Đăng xuất
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
