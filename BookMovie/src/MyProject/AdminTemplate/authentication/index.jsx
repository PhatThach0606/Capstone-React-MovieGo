import { useSelector, useDispatch } from "react-redux";
import { authLogin } from "./slice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const dispatch = useDispatch();
  const data = useSelector((state) => state.AuthenReducer.data);
  const error = useSelector((state) => state.AuthenReducer.error);
  const [localError, setlocalError] = useState("");
  const [errorkey, seterrorkey] = useState(0);
  const handelOnchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data) {
      Navigate("/admin/AdminPage");
    }
  }, [data, Navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    return dispatch(authLogin(user));
  };
  useEffect(() => {
    if (error) {
      setlocalError(
        error.response?.data.content || "Tài khoản hoặc mật khẩu không đúng"
      );
      seterrorkey(Date.now());
      const timer = setTimeout(() => setlocalError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleError = () => {
    return (
      localError && (
        <div
          key={errorkey}
          className="p-4 mb-4 text-md text-red rounded-lg bg-red-200  dark:text-red-400 animate__fadeInUp animate__animated"
          role="alert"
        >
          {localError}
        </div>
      )
    );
  };

  return (
    <div className="relative min-h-screen bg-[url('/image/bg.jpg')] bg-cover bg-center">
      {/* Overlay nếu muốn làm mờ nền */}
      <div className="absolute inset-0 bg-black/40"></div>
      {/* Navbar */}
      <nav className="relative z-10 border-b border-gray-400  opacity-90">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse w-20 h-20 border border-[#F5C518]  rounded-full"
          >
            <img
              src="/image/logo.png"
              className="h-20 w-20 object-contain"
              alt="Logo"
            />
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-white hover:text-yellow-400"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-white hover:text-yellow-400"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-white hover:text-yellow-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 container mx-auto py-10">
        <div className="container mx-auto">
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto opacity-90 bg-white py-10 rounded-2xl px-10 mt-15 shadow-[0_10px_15px_rgba(0,0,0,0.3),0_20px_40px_rgba(0,0,0,0.2)] z-100 animate__animated animate__fadeInUp animate__delay-1s"
          >
            <h1 className="font-bold text-2xl text-black pb-5">
              Đăng nhập Trang chủ
            </h1>
            {/* Error  */}
            {handleError()}
            <div className="mb-5">
              <label
                htmlFor="taiKhoan"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
              >
                Tài khoản
              </label>
              <input
                onChange={handelOnchange}
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập tài khoản"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="matKhau"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
              >
                Mật khẩu
              </label>
              <input
                onChange={handelOnchange}
                type="password"
                id="matKhau"
                name="matKhau"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <button
              type="submit"
              className="text-black  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#E1B63D] dark:hover:bg-green-200 dark:focus:ring-blue-800"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black/70 opacity-80 text-white mt-30">
        <div className="w-full max-w-screen-2xl mx-auto p-6 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="#"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <i className="fa-solid fa-film text-white text-xl"></i>
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Starcine
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-gray-400 sm:text-center">
            © 2025{" "}
            <a href="#" className="hover:underline">
              StarCine
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
