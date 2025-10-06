import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMovie } from "./../adminPage/deletefilm";

export default function Bodymovie(props) {
  const { movie } = props;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteMovie(movie.maPhim));
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
      <td className="px-6 py-4 text-center">
        <div className="pl-10 flex gap-2">
          <button
            onClick={() => handleEdit(movie.maPhim)}
            className="text-blue-600"
          >
            <i className="fa-solid fa-pen-to-square"></i>
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
