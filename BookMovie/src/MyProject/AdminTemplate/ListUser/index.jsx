import { useSelector, useDispatch } from "react-redux";
import { Management } from "./slice";
import { useEffect, useState } from "react";
import { SearchUser } from "./Search";
import User from "../User";

export default function ListUser() {
  const dispatch = useDispatch();
  const {
    loading,
    data = [],
    error,
  } = useSelector((state) => state.ManaReducer);
  const dataSearch = useSelector((state) => state.SearchUserReducer.data);
  const loadingSearch = useSelector((state) => state.SearchUserReducer.loading);
  const errorSearch = useSelector((state) => state.SearchUserReducer.error);

  const [keyword, setKeyword] = useState({ tuKhoa: "" });

  useEffect(() => {
    dispatch(Management());
  }, [dispatch]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setKeyword({ [name]: value });
    if (value.trim() === "") dispatch(Management());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SearchUser(keyword.tuKhoa));
  };

  const renderUser = () => {
    if (loading || loadingSearch) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-4">
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </td>
        </tr>
      );
    }

    if (error || errorSearch) {
      return (
        <tr>
          <td colSpan={6} className="text-center text-red-600 py-4">
            Đã xảy ra lỗi khi tải dữ liệu.
          </td>
        </tr>
      );
    }

    if (dataSearch?.length > 0)
      return dataSearch.map((user) => <User key={user.taiKhoan} data={user} />);
    if (dataSearch?.length === 0 && keyword.tuKhoa !== "")
      return (
        <tr>
          <td colSpan={6} className="text-center text-gray-500 py-4">
            Không tìm thấy người dùng nào phù hợp.
          </td>
        </tr>
      );

    if (!data?.length) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-4">
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </td>
        </tr>
      );
    }

    return data.map((user) => <User key={user.taiKhoan} data={user} />);
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-center font-bold mb-8 text-2xl text-amber-600">
        Danh sách người dùng
      </h1>

      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col sm:flex-row items-stretch gap-2 sm:gap-4 my-6"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
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
            name="tuKhoa"
            onChange={handleOnchange}
            className="block w-full p-3 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tìm kiếm theo tên, tài khoản hoặc số điện thoại"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-3 transition"
        >
          Tìm kiếm
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-xl max-h-[600px]">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="sticky top-0 z-10 text-xs uppercase bg-gradient-to-r from-red-800 to-black text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3">Tài Khoản</th>
              <th className="px-4 sm:px-6 py-3">Họ Tên</th>
              <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Email</th>
              <th className="px-4 sm:px-6 py-3 hidden md:table-cell">
                Số điện thoại
              </th>
              <th className="px-4 sm:px-6 py-3 hidden md:table-cell">
                Mã loại
              </th>
              <th className="px-4 sm:px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>{renderUser()}</tbody>
        </table>
      </div>
    </div>
  );
}
