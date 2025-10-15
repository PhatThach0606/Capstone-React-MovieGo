import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignUp as SignUpThunk } from "./slice";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, data, success } = useSelector(
    (state) => state.SignUpReducer
  );

  const [formValue, setFormValue] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
    maNhom: "GP06",
  });

  const [errorMsg, setErrorMsg] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
    maNhom: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let message = value ? "" : `Vui lòng nhập ${name}`;

    switch (name) {
      case "taiKhoan":
        if (!value) message = "Vui lòng nhập tài khoản";
        else if (!/^[a-zA-Z0-9]{5,}$/.test(value))
          message = "Tài khoản tối thiểu 5 ký tự, chỉ chữ và số";
        break;
      case "matKhau":
        if (!value) message = "Vui lòng nhập mật khẩu";
        else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value))
          message = "Mật khẩu tối thiểu 6 ký tự, gồm chữ và số";
        break;
      case "email":
        if (!value) message = "Vui lòng nhập email";
        else if (
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        )
          message = "Email không đúng định dạng";
        break;
      case "soDt":
        if (!value) message = "Vui lòng nhập số điện thoại";
        else if (!/^(0[35789])[0-9]{8}$/.test(value))
          message = "SDT 10 số, bắt đầu 0, đúng đầu số nhà mạng";
        break;
      case "maNhom":
        if (!value) message = "Vui lòng nhập mã nhóm";
        else if (!/^GP(0[1-9]|1[0-5])$/.test(value))
          message = "Mã nhóm từ GP01 đến GP15";
        break;
      case "hoTen":
        if (!value) message = "Vui lòng nhập họ tên";
        else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(value))
          message = "Họ tên chỉ chứa chữ cái và khoảng trắng";
        break;
      default:
        break;
    }

    setErrorMsg((prev) => ({ ...prev, [name]: message }));
  };

  const isFormValid = () => {
    const fields = ["taiKhoan", "matKhau", "email", "soDt", "hoTen", "maNhom"];
    let valid = true;
    const nextErrors = { ...errorMsg };
    fields.forEach((f) => {
      if (!formValue[f]) {
        nextErrors[f] = `Vui lòng nhập ${f}`;
        valid = false;
      }
    });
    setErrorMsg(nextErrors);
    return valid && Object.values(nextErrors).every((m) => !m);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const payload = { ...formValue };
    try {
      const action = await dispatch(SignUpThunk(payload));
      if (action?.type?.endsWith("/fulfilled")) {
        setTimeout(() => navigate("/"), 800);
      }
    } catch (_) {}
  };

  const apiError = error?.response?.data?.content || null;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Tạo tài khoản</h1>
        <p className="text-sm text-gray-500 mb-6">Đăng ký để đặt vé thuận tiện hơn</p>

        {apiError && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm">
            {apiError}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm">
            Đăng ký thành công!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tài khoản</label>
            <input
              name="taiKhoan"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border px-4 py-2"
              placeholder="Nhập tài khoản"
            />
            {errorMsg.taiKhoan && (
              <span className="text-xs text-red-600">{errorMsg.taiKhoan}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border px-4 py-2"
              placeholder="Nhập mật khẩu"
            />
            {errorMsg.matKhau && (
              <span className="text-xs text-red-600">{errorMsg.matKhau}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border px-4 py-2"
              placeholder="name@example.com"
            />
            {errorMsg.email && (
              <span className="text-xs text-red-600">{errorMsg.email}</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Số điện thoại</label>
              <input
                name="soDt"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="0xxxxxxxxx"
              />
              {errorMsg.soDt && (
                <span className="text-xs text-red-600">{errorMsg.soDt}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Họ tên</label>
              <input
                name="hoTen"
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border px-4 py-2"
                placeholder="Nguyễn Văn A"
              />
              {errorMsg.hoTen && (
                <span className="text-xs text-red-600">{errorMsg.hoTen}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mã nhóm</label>
            <input
              name="maNhom"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full rounded-lg border px-4 py-2"
              placeholder="VD: GP06"
              defaultValue="GP06"
            />
            {errorMsg.maNhom && (
              <span className="text-xs text-red-600">{errorMsg.maNhom}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 inline-flex justify-center rounded-lg px-4 py-2 text-white shadow ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-sm text-gray-600 mt-2">
            Đã có tài khoản? {" "}
            <Link className="text-blue-600 hover:underline" to="/sign-in">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
