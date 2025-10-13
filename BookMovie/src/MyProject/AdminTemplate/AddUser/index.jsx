import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUserAT, resetAddUser } from "./slice";

export default function AddUser() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.AddUserReducer);
  const errormessage = error?.response?.data?.content;

  const [formValue, setFormValue] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const [erroeMess, setErroMess] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

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
        else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&^#%+=_()-]{6,}$/.test(
            value
          )
        )
          message = `Mật khẩu phải ít nhất 6 ký tự, bao gồm Ít nhất:\n 1 Chữ cái in Hoa\n 1 Số\n 1 Ký tự đặc biệt`;
        break;

      case "email":
        if (!value) message = "Vui lòng nhập Email";
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
          message = "Vui lòng nhập Email đúng định dạng";
        break;

      case "soDt":
        if (!value) message = "Vui lòng nhập số điện thoại";
        else if (!/^(0[35789])[0-9]{8}$/.test(value))
          message = `Vui lòng nhập SDT đúng định dạng:\n1. Đủ 10 số\n2. Bắt đầu bằng 0\n3. Phù hợp số nhà mạng`;
        break;

      case "maNhom":
        if (!value) message = "Vui lòng nhập mã nhóm (ví dụ: GP06)";
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
        else if (!/^[\p{L}\s]+$/u.test(value))
          message = "Họ tên chỉ được chứa chữ cái (có dấu) và khoảng trắng";
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
    dispatch(AddUserAT(formValue));
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0 && !loading && !error) {
      alert("✅ Thêm người dùng thành công!");
      setFormValue({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "",
        maLoaiNguoiDung: "",
        hoTen: "",
      });
      dispatch(resetAddUser());
    }
  }, [data, loading, error]);

  return (
    <div className="mt-10 px-4">
      <h1 className="text-center font-bold text-3xl sm:text-4xl mb-8">
        Thêm người dùng
      </h1>

      <div className="container mx-auto flex justify-center">
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          {errormessage && (
            <div className="flex justify-center items-center mb-4">
              <div className="bg-red-200 rounded px-5 py-2 w-full text-center">
                <h3 className="text-red-600 font-semibold">{errormessage}</h3>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tài khoản */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium">Tài Khoản</label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="taiKhoan"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập tài khoản"
                  required
                />
                <span className="text-red-500 text-sm mt-1 whitespace-pre-line">
                  {erroeMess.taiKhoan}
                </span>
              </div>

              {/* Mật khẩu */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium">Mật khẩu</label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="matKhau"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập mật khẩu"
                />
                <span className="text-red-500 text-sm mt-1 whitespace-pre-line">
                  {erroeMess.matKhau}
                </span>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium">Email</label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="email"
                  name="email"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập Email"
                />
                <span className="text-red-500 text-sm mt-1 whitespace-pre-line">
                  {erroeMess.email}
                </span>
              </div>

              {/* Số điện thoại */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium">
                  Số điện thoại
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="soDt"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập số điện thoại"
                />
                <span className="text-red-500 text-sm mt-1 whitespace-pre-line">
                  {erroeMess.soDt}
                </span>
              </div>

              {/* Mã nhóm */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium">Mã nhóm</label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="maNhom"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập mã nhóm"
                />
                <span className="text-red-500 text-sm mt-1 whitespace-pre-line">
                  {erroeMess.maNhom}
                </span>
              </div>

              {/* Mã loại người dùng */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium">
                  Mã loại đối tượng
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="maLoaiNguoiDung"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập mã loại đối tượng"
                />
                <span className="text-red-500 text-sm mt-1 whitespace-pre-line">
                  {erroeMess.maLoaiNguoiDung}
                </span>
              </div>

              {/* Họ tên */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium">Họ tên</label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="hoTen"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập họ tên"
                />
                <span className="text-red-500 text-sm mt-1 whitespace-pre-line">
                  {erroeMess.hoTen}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-6 rounded-xl bg-amber-700 text-white py-3 font-semibold hover:bg-amber-900 transition"
            >
              {loading ? "Đang thêm người dùng..." : "+ Thêm Người dùng"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
