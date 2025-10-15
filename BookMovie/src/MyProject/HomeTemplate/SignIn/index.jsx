import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignIn as SignInThunk } from "./slice";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.SignInReducer
  );

  const [formValue, setFormValue] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let message = value ? "" : `Vui lòng nhập ${name}`;
    if (name === "taiKhoan" && value && value.length < 5) {
      message = "Tài khoản tối thiểu 5 ký tự";
    }
    if (name === "matKhau" && value && value.length < 6) {
      message = "Mật khẩu tối thiểu 6 ký tự";
    }
    setErrorMsg((prev) => ({ ...prev, [name]: message }));
  };

  const isFormValid = () => {
    const fields = ["taiKhoan", "matKhau"];
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

    try {
      const action = await dispatch(SignInThunk(formValue));
      if (action?.type?.endsWith("/fulfilled")) {
        try {
          localStorage.setItem("user", JSON.stringify(action.payload));
          // notify other components (same tab) about auth change
          try {
            window.dispatchEvent(new Event("storage"));
          } catch (_) {}
        } catch (_) {}
        setTimeout(() => navigate("/"), 300);
      }
    } catch (_) {}
  };

  const apiError = error?.response?.data?.content || null;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Đăng nhập</h1>
        <p className="text-sm text-gray-500 mb-6">Chào mừng bạn quay lại</p>

        {apiError && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm">
            {apiError}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm">
            Đăng nhập thành công!
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

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 inline-flex justify-center rounded-lg px-4 py-2 text-white shadow ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-sm text-gray-600 mt-2">
            Chưa có tài khoản? {" "}
            <Link className="text-blue-600 hover:underline" to="/sign-up">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
