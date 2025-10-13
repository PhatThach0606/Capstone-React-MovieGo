import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "./slice";
import { Management } from "../ListUser/slice";

export default function User({ data }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Bạn có muốn xóa tài khoản ${data.taiKhoan}?`)) {
      dispatch(deleteUser(data.taiKhoan));
      dispatch(Management());
    }
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-blue-50 transition text-black">
      <td className="px-4 sm:px-6 py-3">{data.taiKhoan}</td>
      <td className="px-4 sm:px-6 py-3">{data.hoTen}</td>
      <td className="px-4 sm:px-6 py-3 hidden sm:table-cell">{data.email}</td>
      <td className="px-4 sm:px-6 py-3 hidden md:table-cell">{data.soDT}</td>
      <td className="px-4 sm:px-6 py-3 hidden md:table-cell">
        {data.maLoaiNguoiDung}
      </td>
      <td className="px-4 sm:px-6 py-3">
        <div className="flex justify-center sm:justify-start gap-3 items-center">
          <NavLink
            to="/admin/edit-user"
            state={{
              taiKhoan: data.taiKhoan,
              matKhau: data.matKhau,
              email: data.email,
              maNhom: "GP06",
              soDt: data.soDT,
              maLoaiNguoiDung: data.maLoaiNguoiDung,
              hoTen: data.hoTen,
            }}
          >
            <i className="fa-solid fa-pen-to-square text-blue-600 hover:text-blue-800 text-lg"></i>
          </NavLink>
          <button onClick={handleDelete}>
            <i className="fa-solid fa-trash text-red-600 hover:text-red-800 text-lg"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
