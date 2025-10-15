import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AddFilm, resetAddFilm } from "./slice";

export default function AddNewFilm() {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.AddFilmReducer);

  const [message, setMessage] = useState("");
  const [formValue, setFormValue] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    maNhom: "",
    ngayKhoiChieu: "",
    danhGia: 0,
    hot: false,
    dangChieu: false,
    sapChieu: false,
    hinhAnh: "",
  });
  const [hinhAnhFile, setHinhAnh] = useState(null);
  const [errorMess, setErrorMess] = useState({
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    maNhom: "",
    ngayKhoiChieu: "",
    danhGia: "",
  });

  useEffect(() => {
    if (error) {
      const msg = error?.response?.data?.content || "Đã có lỗi xảy ra";
      setMessage(msg);
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setMessage("Thêm phim thành công 🎉");
      const timer = setTimeout(() => setMessage(""), 3000);
      dispatch(resetAddFilm());
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleOnchange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name === "sapChieu") {
      setFormValue({
        ...formValue,
        sapChieu: checked,
        dangChieu: checked ? false : formValue.dangChieu,
      });
      return;
    }
    if (name === "dangChieu") {
      setFormValue({
        ...formValue,
        dangChieu: checked,
        sapChieu: checked ? false : formValue.sapChieu,
      });
      return;
    }
    setFormValue({
      ...formValue,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOnblur = (e) => {
    const { name, value } = e.target;
    let message = value === "" ? `Vui lòng nhập ${name}` : "";

    switch (name) {
      case "tenPhim":
        if (!value) message = "Vui lòng nhập Tên Phim";
        else if (!/^[\p{L}0-9\s]+$/u.test(value))
          message = "Tên Phim chỉ được chứa chữ cái, số và khoảng trắng";
        break;
      case "biDanh":
        if (!value) message = "Vui lòng nhập Bí Danh";
        else if (!/^[a-zA-Z0-9\s-]+$/.test(value))
          message = "Bí Danh chỉ được chứa chữ, số, dấu '-' và khoảng trắng";
        break;
      case "trailer":
        if (!value) message = "Vui lòng nhập trailer";
        else if (
          !/^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(
            value
          )
        )
          message = "Trailer phải là URL hợp lệ";
        break;
      case "moTa":
        if (!value) message = "Vui lòng nhập mô tả";
        break;
      case "maNhom":
        if (!value) message = "Vui lòng nhập mã nhóm (mã GP06 nhóm mình nha)";
        else if (!/^GP(0[1-9]|1[0-5])$/.test(value))
          message = "Mã nhóm phải từ GP01 tới GP15";
        break;
      case "ngayKhoiChieu":
        if (!value) message = "Vui lòng nhập ngày khởi chiếu";
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
          message = "Ngày khởi chiếu phải có định dạng YYYY-MM-DD";
        break;
      case "danhGia":
        if (!value) message = "Vui lòng nhập đánh giá";
        else if (!/^[0-9]{1,2}$/.test(value) || Number(value) > 10)
          message = "Đánh giá phải là số từ 0 → 10";
        break;
      default:
        break;
    }
    setErrorMess({ ...errorMess, [name]: message });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHinhAnh(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormValue({ ...formValue, hinhAnh: previewURL });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tenPhim", formValue.tenPhim);
    formData.append("biDanh", formValue.biDanh);
    formData.append("trailer", formValue.trailer);
    formData.append("moTa", formValue.moTa);
    formData.append("maNhom", formValue.maNhom);
    formData.append("ngayKhoiChieu", formatDate(formValue.ngayKhoiChieu));
    formData.append("sapChieu", formValue.sapChieu);
    formData.append("dangChieu", formValue.dangChieu);
    formData.append("hot", formValue.hot);
    formData.append("danhGia", formValue.danhGia);
    if (hinhAnhFile) formData.append("File", hinhAnhFile);
    dispatch(AddFilm(formData));
  };

  return (
    <div className="container mx-auto px-4 flex justify-center items-center mt-10 ">
      <div className="w-full sm:w-3/4 lg:w-1/2 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
        {message && (
          <div className="text-center  text-amber-600 font-semibold text-base sm:text-lg">
            {message}
          </div>
        )}
        <h1 className="text-green-700 font-bold text-xl text-center">
          Thêm Phim
        </h1>
        <form
          onSubmit={handleSubmit}
          className="text-black overflow-y-auto my-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tên phim */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Tên Phim</label>
              <input
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="text"
                name="tenPhim"
                placeholder="Nhập tên phim"
                value={formValue.tenPhim}
                className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500 text-sm">{errorMess.tenPhim}</span>
            </div>

            {/* Trailer */}
            <div>
              <label className="block mb-2 text-sm font-medium">Trailer</label>
              <input
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="text"
                name="trailer"
                placeholder="Nhập trailer"
                value={formValue.trailer}
                className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500 text-sm">{errorMess.trailer}</span>
            </div>

            {/* Hình ảnh */}
            <div>
              <label className="block mb-2 text-sm font-medium">Hình ảnh</label>
              <input
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                name="hinhAnh"
                id="hinhAnh"
                className="block w-full text-sm border rounded-lg cursor-pointer"
              />
              {formValue.hinhAnh && (
                <img
                  src={formValue.hinhAnh}
                  alt="preview"
                  className="mt-2 w-20 h-20 rounded object-cover"
                />
              )}
            </div>

            {/* Ngày khởi chiếu */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Ngày khởi chiếu
              </label>
              <input
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="date"
                name="ngayKhoiChieu"
                value={formValue.ngayKhoiChieu}
                className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500 text-sm">
                {errorMess.ngayKhoiChieu}
              </span>
            </div>

            {/* Đánh giá */}
            <div>
              <label className="block mb-2 text-sm font-medium">Đánh giá</label>
              <input
                min={0}
                max={10}
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="number"
                name="danhGia"
                placeholder="Nhập đánh giá"
                value={formValue.danhGia}
                className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500 text-sm">{errorMess.danhGia}</span>
            </div>

            {/* Mã nhóm */}
            <div>
              <label className="block mb-2 text-sm font-medium">Mã nhóm</label>
              <input
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="text"
                name="maNhom"
                value={formValue.maNhom}
                placeholder="Nhập mã nhóm"
                className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500 text-sm">{errorMess.maNhom}</span>
            </div>

            {/* Mô tả */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Mô tả</label>
              <textarea
                onChange={handleOnchange}
                onBlur={handleOnblur}
                name="moTa"
                rows={4}
                placeholder="Nhập mô tả phim"
                value={formValue.moTa}
                className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500 text-sm">{errorMess.moTa}</span>
            </div>

            {/* Checkbox */}
            <div className="sm:col-span-2 flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="sapChieu"
                  checked={formValue.sapChieu}
                  onChange={handleOnchange}
                />
                Sắp chiếu
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="dangChieu"
                  checked={formValue.dangChieu}
                  onChange={handleOnchange}
                />
                Đang chiếu
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="hot"
                  checked={formValue.hot}
                  onChange={handleOnchange}
                />
                Hot
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition"
          >
            {loading ? (
              <div role="status" className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591..."
                    fill="currentColor"
                  />
                </svg>
              </div>
            ) : (
              "Thêm phim mới"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
