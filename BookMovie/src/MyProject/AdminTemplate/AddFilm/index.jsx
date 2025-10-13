import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AddFilm, resetAddFilm } from "./slice";

export default function AddNewFilm() {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.AddFilmReducer);

  console.log(error?.response?.data?.content);
  const [message, setMessage] = useState("");

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

  // ----------------- Handle onchange -----------------
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

  // ----------------- Handle blur validation -----------------
  const handleOnblur = (e) => {
    const { name, value } = e.target;
    let message = value === "" ? `Vui lòng nhập ${name}` : "";

    switch (name) {
      case "tenPhim":
        if (!value) {
          message = "Vui lòng nhập Tên Phim";
        } else if (!/^[\p{L}0-9\s]+$/u.test(value)) {
          message = "Tên Phim chỉ được chứa chữ cái, số và khoảng trắng";
        }
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
        if (!value) {
          message = "Vui lòng nhập mã nhóm (mã GP06 nhóm mình nha)";
        } else if (!/^GP(0[1-9]|1[0-5])$/.test(value)) {
          message = "Mã nhóm phải từ GP01 tới GP15";
        }
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

  // ----------------- Handle file change -----------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHinhAnh(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormValue({ ...formValue, hinhAnh: previewURL });
    }
  };

  // ----------------- Format date -----------------
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ----------------- Handle submit -----------------
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

  // ----------------- Render -----------------
  return (
    <div className="container mx-auto my-auto items-center flex justify-center min-h-screen">
      <div className="w-[50%]">
        {message && (
          <div className="text-center mb-5 text-amber-500 font-bold text-xl">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="text-black">
          <div className="grid gap-4 mb-4 grid-cols-2">
            {/* Tên phim */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-black">
                Tên Phim
              </label>
              <input
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="text"
                name="tenPhim"
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Nhập tên phim"
                value={formValue.tenPhim}
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.tenPhim}
              </span>
            </div>

            {/* Trailer */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Trailer
              </label>
              <input
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="text"
                name="trailer"
                className=" md:w-full rounded-xl border px-4 py-2"
                placeholder="Nhập trailer"
                value={formValue.trailer}
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.trailer}
              </span>
            </div>

            {/* Hình ảnh */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Hình ảnh
              </label>
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
                  className="mt-2 w-20 h-20 rounded object-cover"
                  src={formValue.hinhAnh}
                  alt="preview"
                />
              )}
            </div>

            {/* Ngày khởi chiếu */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Ngày khởi chiếu
              </label>
              <input
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="date"
                name="ngayKhoiChieu"
                className="w-full rounded-xl border px-4 py-2"
                value={formValue.ngayKhoiChieu}
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.ngayKhoiChieu}
              </span>
            </div>

            {/* Đánh giá */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Đánh giá
              </label>
              <input
                min={0}
                max={10}
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="number"
                name="danhGia"
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Nhập đánh giá"
                value={formValue.danhGia}
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.danhGia}
              </span>
            </div>

            {/* Mã nhóm */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Mã nhóm
              </label>
              <input
                onChange={handleOnchange}
                onBlur={handleOnblur}
                type="text"
                name="maNhom"
                className="w-full rounded-xl border px-4 py-2"
                value={formValue.maNhom}
                placeholder="Nhập mã nhóm"
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.maNhom}
              </span>
            </div>

            {/* Mô tả */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-black">
                Mô tả
              </label>
              <textarea
                onChange={handleOnchange}
                onBlur={handleOnblur}
                name="moTa"
                rows={4}
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Nhập mô tả phim"
                value={formValue.moTa}
              />
              <span className="text-red-500 text-sm block whitespace-pre-line">
                {errorMess.moTa}
              </span>
            </div>

            {/* Checkbox */}
            <div className="col-span-2 flex gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sapChieu"
                  checked={formValue.sapChieu}
                  onChange={handleOnchange}
                />
                Sắp chiếu
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="dangChieu"
                  checked={formValue.dangChieu}
                  onChange={handleOnchange}
                />
                Đang chiếu
              </label>

              <label className="flex items-center gap-2">
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
            className="w-full mt-4 rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 transition"
          >
            {loading ? (
              <div role="status" className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
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
