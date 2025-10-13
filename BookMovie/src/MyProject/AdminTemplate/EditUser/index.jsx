import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditUserAST } from "./slice";

export default function EditUser() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.EditUserReducer
  );
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
    setFormValue({ ...formValue, [name]: value });
  };

  const [errorMess, setErrorMess] = useState({
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
        if (!value) message = "Vui lòng nhập tài khoản";
        else if (!/^[a-zA-Z0-9]{5,}$/.test(value))
          message = "Tài khoản phải ít nhất 5 ký tự, chỉ gồm chữ và số";
        break;
      case "matKhau":
        if (!value) message = "Vui lòng nhập mật khẩu";
        else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value))
          message = "Mật khẩu phải ít nhất 6 ký tự, bao gồm chữ và số";
        break;
      case "email":
        if (!value) message = "Vui lòng nhập Email";
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
          message = "Vui lòng nhập Email đúng định dạng";
        break;
      case "soDt":
        if (!value) message = "Vui lòng nhập số điện thoại";
        else if (!/^(0[35789])[0-9]{8}$/.test(value))
          message =
            "Vui lòng nhập SDT đúng định dạng:\n1. SDT phải đủ 10 số\n2. Bắt đầu từ số 0\n3. Phù hợp với số nhà mạng";
        break;
      case "maNhom":
        if (!value) message = "Vui lòng nhập mã nhóm (GP06)";
        else if (!/^GP(0[1-9]|1[0-5])$/.test(value))
          message = "Mã nhóm phải từ GP01 tới GP15";
        break;
      case "maLoaiNguoiDung":
        if (!value) message = "Vui lòng nhập mã loại người dùng";
        else if (!/^(QuanTri|KhachHang)$/.test(value))
          message = "Mã loại người dùng chỉ được là QuanTri hoặc KhachHang";
        break;
      case "hoTen":
        if (!value) message = "Vui lòng nhập họ tên";
        else if (!/^[a-zA-Z\s]+$/.test(value))
          message = "Họ tên chỉ được chứa chữ cái và khoảng trắng";
        break;
      default:
        break;
    }
    setErrorMess({ ...errorMess, [name]: message });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(EditUserAST(formValue));
  };

  return (
    <div className="min-h-screen flex justify-center pt-10 bg-gray-50 p-4">
      <div className="w-full sm:w-3/4 lg:w-1/2 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 overflow-y-auto max-h-[80vh]">
        <h1 className="text-center font-bold text-2xl sm:text-3xl mb-6">
          Chỉnh sửa Người dùng
        </h1>

        <form onSubmit={handleSubmit} className="text-black">
          <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
            {/* Tài khoản */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">
                Tài Khoản
              </label>
              <input
                disabled
                onChange={handleOnchange}
                type="text"
                name="taiKhoan"
                className="w-full rounded-xl border px-4 py-2 bg-gray-200"
                placeholder="Nhập tài khoản"
                value={formValue.taiKhoan}
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.taiKhoan}
              </span>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block mb-2 text-sm font-medium">Mật khẩu</label>
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
                {errorMess.matKhau}
              </span>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                onChange={handleOnchange}
                onBlur={hanldeOnblur}
                type="email"
                name="email"
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Nhập email"
                value={formValue.email}
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.email}
              </span>
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block mb-2 text-sm font-medium">
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
                {errorMess.soDt}
              </span>
            </div>

            {/* Mã nhóm */}
            <div>
              <label className="block mb-2 text-sm font-medium">Mã nhóm</label>
              <input
                disabled
                type="text"
                name="maNhom"
                className="w-full rounded-xl border px-4 py-2 bg-gray-200"
                placeholder="Nhập mã nhóm"
                value={formValue.maNhom}
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.maNhom}
              </span>
            </div>

            {/* Mã loại người dùng */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Mã loại người dùng
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
                {errorMess.maLoaiNguoiDung}
              </span>
            </div>

            {/* Họ tên */}
            <div>
              <label className="block mb-2 text-sm font-medium">Họ tên</label>
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
                {errorMess.hoTen}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 rounded-xl bg-red-800 text-white py-3 font-semibold hover:bg-red-900 transition"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </form>
      </div>
    </div>
  );
}
