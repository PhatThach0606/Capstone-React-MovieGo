import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { renderMovie } from "./slice";
import Bodymovie from "./../bodymovie";

export default function AdminPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.AdminPageReducer.data);

  const removeVn = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const [searchMovie, setSearchMovie] = useState("");
  const filterMovies = data?.filter((movie) => {
    const keyword = removeVn(searchMovie.toLowerCase());
    const maPhim = removeVn(movie?.maPhim?.toString().toLowerCase() || "");
    const tenPhim = removeVn(movie?.tenPhim?.toString().toLowerCase() || "");
    return maPhim.includes(keyword) || tenPhim.includes(keyword);
  });

  useEffect(() => {
    dispatch(renderMovie());
  }, [dispatch]);

  const renderListMovie = () => {
    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-4">
            <div className="inline-flex justify-center items-center">
              <svg
                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </td>
        </tr>
      );
    }

    const listToRender = searchMovie ? filterMovies : data;

    return listToRender.length > 0 ? (
      listToRender.map((movie) => (
        <Bodymovie key={movie.maPhim} movie={movie} />
      ))
    ) : (
      <tr>
        <td colSpan={5} className="text-center py-4 text-gray-500">
          Không tìm thấy phim nào
        </td>
      </tr>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Thanh tìm kiếm */}
      <div className="mb-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-xl mx-auto px-2 sm:px-0"
        >
          <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500">
            <span className="pl-3 text-gray-500">
              <svg
                className="w-5 h-5"
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
            </span>
            <input
              onChange={(e) => setSearchMovie(e.target.value)}
              type="search"
              className="w-full p-3 sm:p-4 text-sm text-black bg-white border-none outline-none rounded-lg"
              placeholder="Tìm kiếm theo tên hoặc mã phim..."
            />
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
            >
              Tìm
            </button>
          </div>
        </form>
      </div>

      {/* Bảng dữ liệu phim */}
      <div className="relative overflow-x-auto shadow-md rounded-xl border border-gray-200 bg-white">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 z-10 text-xs uppercase bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                  Mã phim
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                  Hình ảnh
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                  Tên phim
                </th>
                <th className="hidden sm:table-cell px-4 sm:px-6 py-3 sm:py-4 font-semibold">
                  Bí danh
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold">
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
