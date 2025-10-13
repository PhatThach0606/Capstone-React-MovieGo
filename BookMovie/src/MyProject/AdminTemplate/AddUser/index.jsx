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
    <div className="mt-10">
      <h1 className="text-center font-bold text-3xl">Thêm người dùng</h1>

      <div className="container mx-auto mt-10 flex justify-center">
        <div className="w-[40%]">
          {errormessage && (
            <div className="flex justify-center items-center">
              <div className="bg-red-200 rounded px-5">
                <h3 className="my-5 text-red-600 font-semibold">
                  {errormessage}
                </h3>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="text-black">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-black">
                  Tài Khoản
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="taiKhoan"
                  className="w-full rounded-xl border px-4 py-2 "
                  placeholder="Nhập tài khoản"
                  required
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
                  name="email"
                  className="block w-full text-sm border rounded-lg cursor-pointer"
                  placeholder="Nhập Email"
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
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="maNhom"
                  className="w-full rounded-xl border px-4 py-2 "
                  placeholder="Nhập mã nhóm"
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
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.hoTen}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 rounded-xl bg-amber-700 text-white py-3 font-semibold hover:bg-amber-900 transition"
            >
              {loading ? "Đang thêm người dùng..." : "+Thêm Người dùng"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
