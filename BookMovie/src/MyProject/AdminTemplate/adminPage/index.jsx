import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { renderMovie } from "./slice";

import Bodymovie from "../boydMovie";

export default function AdminPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.AdminPageReducer.data);

  useEffect(() => {
    dispatch(renderMovie());
  }, []);

  const renderListMovie = () => {
    return data?.map((movie) => {
      return <Bodymovie key={movie.maPhim} movie={movie} />;
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className=" col-span-10  mb-10 ">
        <div className="containter mx-auto px-10 grid grid-cols-1 gap-5">
          <div className="">
            <form>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  className="block w-full p-4 ps-10 text-sm text-black border-1 border-black-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
        <div className="max-h-[700px] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 z-10 text-xs uppercase bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Mã phim
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Hình ảnh
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Tên phim
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Bí danh phim
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>{renderListMovie()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
