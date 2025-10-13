import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "./slice";
import { Management } from "../ListUser/slice";
export default function User(props) {
  const dispatch = useDispatch();
  const { data } = props;

  const handleDelete = () => {
    if (window.confirm(`Bạn có muốn xóa tài khoản ${data.taiKhoan} ?`)) alert();
    dispatch(deleteUser(data.taiKhoan));
    dispatch(Management());
  };
  return (
    <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-blue-50 transition text-black">
      <td className="px-6 py-4">{data.taiKhoan}</td>
      <td className="px-6 py-4">{data.hoTen}</td>
      <td className="px-6 py-4">{data.email}</td>
      <td className="px-6 py-4">{data.soDT}</td>
      <td className="px-6 py-4">{data.maLoaiNguoiDung}</td>
      <td className="px-6 py-4 ">
        <div className=" flex gap-2  text-center pl-3 items-center">
          <button>
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
              <i className="fa-solid fa-pen-to-square text-center"></i>
            </NavLink>
          </button>
          <button className="text-red-600" onClick={handleDelete}>
            <i className="fa-solid fa-trash text-center"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
