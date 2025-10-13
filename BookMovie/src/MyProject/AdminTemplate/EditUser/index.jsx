import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditUserAST } from "./slice";

export default function EditUser() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.EditUserReducer
  );
  console.log(data);
  const location = useLocation();
  const user = location.state;

  const [formValue, setFormValue] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  useEffect(() => {
    // if(data)
    if (user) {
      setFormValue({
        taiKhoan: user.taiKhoan || "",
        matKhau: user.matKhau || "",
        email: user.email || "",
        soDt: user.soDt || "",
        maNhom: user.maNhom || "",
        maLoaiNguoiDung: user.maLoaiNguoiDung || "",
        hoTen: user.hoTen || "",
      });
    }
  }, [user]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const [erroeMess, setErroMess] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const hanldeOnblur = (e) => {
    const { name, value } = e.target;
    let message = value === "" ? `Vui lòng nhập ${name}` : "";
    switch (name) {
      case "taiKhoan":
        if (!value) {
          message = "Vui lòng nhập tài khoản";
        } else if (!/^[a-zA-Z0-9]{5,}$/.test(value)) {
          message = "Tài khoản phải ít nhất 5 ký tự, chỉ gồm chữ và số";
        }
        break;

      case "matKhau":
        if (!value) {
          message = "Vui lòng nhập mật khẩu";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
          message = "Mật khẩu phải ít nhất 6 ký tự, bao gồm chữ và số";
        }
        break;

      case "email":
        if (!value) {
          message = "Vui lòng nhập Email";
        } else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ) {
          message = "Vui lòng nhập Email đúng định dạng";
        }
        break;

      case "soDt":
        if (!value) {
          message = "Vui lòng nhập số điện thoại";
        } else if (!/^(0[35789])[0-9]{8}$/.test(value)) {
          message = `Vui lòng nhập SDT đúng định dạng:\n1. SDT phải đủ 10 số\n2. Bắt đầu từ số 0\n3. Phù hợp với số nhà mạng`;
        }
        break;

      case "maNhom":
        if (!value) {
          message = "Vui lòng nhập mã nhóm (mã GP06 nhóm mình nha)";
        } else if (!/^GP(0[1-9]|1[0-5])$/.test(value)) {
          message = "Mã nhóm phải từ GP01 tới GP15";
        }
        break;

      case "maLoaiNguoiDung":
        if (!value) {
          message = "Vui lòng nhập mã loại người dùng";
        } else if (!/^(QuanTri|KhachHang)$/.test(value)) {
          message = "Mã loại người dùng chỉ được là QuanTri hoặc KhachHang";
        }
        break;

      case "hoTen":
        if (!value) {
          message = "Vui lòng nhập họ tên";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          message = "Họ tên chỉ được chứa chữ cái và khoảng trắng";
        }
        break;

      default:
        break;
    }
    setErroMess({
      ...erroeMess,
      [name]: message,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(EditUserAST(formValue));
  };
  return (
    <div className="mt-10">
      <h1 className="text-center font-bold text-3xl">Chỉnh sửa Người dùng</h1>
      <div className="container mx-auto mt-10 items-center flex justify-center">
        <div className="w-[60%]">
          <form onSubmit={handleSubmit} className="text-black">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-black">
                  Tài Khoản
                </label>
                <input
                  disabled
                  onChange={handleOnchange}
                  type="text"
                  name="taiKhoan"
                  className="w-full rounded-xl border px-4 py-2 bg-gray-200"
                  placeholder="Nhập tài khoản"
                  required
                  value={formValue.taiKhoan}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.taiKhoan}
                </span>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Mật khẩu
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="matKhau"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập mật khẩu"
                  value={formValue.matKhau}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.matKhau}
                </span>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Email
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="email"
                  value={formValue.email}
                  name="email"
                  className="block w-full text-sm border rounded-lg cursor-pointer"
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.email}
                </span>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Số điện thoại
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="soDt"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập số điện thoại"
                  value={formValue.soDt}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.soDt}
                </span>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Mã nhóm
                </label>
                <input
                  disabled
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="maNhom"
                  className="w-full rounded-xl border px-4 py-2 bg-gray-200"
                  placeholder="Nhập mã  nhóm"
                  value={formValue.maNhom}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.maNhom}
                </span>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Mã loại đối tượng
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="maLoaiNguoiDung"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập mã loại đối tượng"
                  value={formValue.maLoaiNguoiDung}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.maLoaiNguoiDung}
                </span>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Họ tên
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="hoTen"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập họ tên"
                  value={formValue.hoTen}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.hoTen}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-4 rounded-xl bg-red-800 text-white py-3 font-semibold hover:bg-red-900 transition"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
