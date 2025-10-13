import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../adminPage/deletefilm";
import { renderMovie } from "./../adminPage/slice";

export default function Bodymovie({ movie }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const isConfirm = window.confirm(
      `Bạn có chắc muốn xóa phim "${movie.tenPhim}" không?`
    );
    if (!isConfirm) return;

    try {
      await dispatch(deleteMovie(movie.maPhim)).unwrap();
      alert(`Đã xóa phim "${movie.tenPhim}" thành công!`);
      dispatch(renderMovie());
    } catch (error) {
      alert("Xóa phim thất bại. Vui lòng thử lại!");
      console.error(error);
    }
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-blue-50 transition">
      <td className="px-4 sm:px-6 py-3 sm:py-4">{movie.maPhim}</td>
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <img
          className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
        />
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium">{movie.tenPhim}</td>
      <td className="hidden sm:table-cell px-4 sm:px-6 py-3 sm:py-4 text-gray-600">
        {movie.biDanh}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
        <div className="flex justify-center gap-3 text-lg">
          <NavLink
            to="/admin/edit"
            state={movie}
            className="text-blue-600 hover:text-blue-800"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </NavLink>

          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
          >
            <i className="fa-solid fa-trash"></i>
          </button>

          <NavLink
            to="/admin/addcalender"
            state={{
              maPhim: movie.maPhim,
              hinhAnh: movie.hinhAnh,
              tenPhim: movie.tenPhim,
            }}
            className="text-green-500 hover:text-green-700"
          >
            <i className="fa-solid fa-calendar"></i>
          </NavLink>
        </div>
      </td>
    </tr>
  );
}
