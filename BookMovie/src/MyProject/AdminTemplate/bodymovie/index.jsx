import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../adminPage/deletefilm";
import { renderMovie } from "./../adminPage/slice";
export default function Bodymovie(props) {
  const { movie } = props;
  const dispatch = useDispatch();
  const handleDelete = () => {
    alert(`Bạn có muốn xóa phim ${movie.tenPhim}`);
    dispatch(deleteMovie(movie.maPhim));
    dispatch(renderMovie());
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-blue-50 transition">
      <td className="px-6 py-4">{movie.maPhim}</td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <img className="w-10 h-10" src={movie.hinhAnh} alt="" />
      </td>

      <td className="px-6 py-4">{movie.tenPhim}</td>
      <td className="px-6 py-4">{movie.biDanh}</td>
      <td className="px-6 py-4 text-center flex justify-center items-center">
        <div className=" flex gap-2">
          <button className="text-blue-600">
            <NavLink
              to="/admin/edit"
              state={{
                maPhim: movie.maPhim,
                maNhom: movie.maNhom,
                hinhAnh: movie.hinhAnh,
                tenPhim: movie.tenPhim,
                moTa: movie.moTa,
                ngayKhoiChieu: movie.ngayKhoiChieu,
                sapChieu: movie.sapChieu,
                dangChieu: movie.dangChieu,
                hot: movie.hot,
                danhGia: movie.danhGia,
                hinhAnh: movie.hinhAnh,
                trailer: movie.trailer,
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </NavLink>
          </button>
          <button onClick={() => handleDelete()} className="text-red-600">
            <i className="fa-solid fa-trash"></i>
          </button>
          <button>
            <NavLink
              to="/admin/addcalender"
              state={{
                maPhim: movie.maPhim,
                hinhAnh: movie.hinhAnh,
                tenPhim: movie.tenPhim,
              }}
              className="text-green-400"
            >
              <i className="fa-solid fa-calendar"></i>
            </NavLink>
          </button>
        </div>
      </td>
    </tr>
  );
}
