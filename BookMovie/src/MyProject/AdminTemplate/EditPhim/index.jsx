import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditMovie } from "./slice";

export default function EditFilm() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.EditFilmReducer
  );
  const location = useLocation();
  const movie = location.state;

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

  useEffect(() => {
    if (movie) {
      setFormValue({
        maPhim: movie.maPhim || "",
        tenPhim: movie.tenPhim || "",
        biDanh: movie.biDanh || "",
        trailer: movie.trailer || "",
        moTa: movie.moTa || "",
        maNhom: movie.maNhom || "",

        ngayKhoiChieu: partDate(movie.ngayKhoiChieu),
        danhGia: movie.danhGia || 0,
        hot: movie.hot || false,
        dangChieu: movie.dangChieu || false,
        sapChieu: movie.sapChieu || false,
        hinhAnh: movie.hinhAnh || "",
      });
    }
  }, [movie]);

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

  const [erroeMess, setErroMess] = useState({
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    maNhom: "",
    ngayKhoiChieu: "",
    danhGia: "",
  });

  const hanldeOnblur = (e) => {
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

      case "maNhom":
        if (!value) {
          message = "Vui lòng nhập mã nhóm (mã GP06 nhóm mình nha)";
        } else if (!/^GP(0[1-9]|1[0-5])$/.test(value)) {
          message = "Mã nhóm phải từ GP01 tới GP15";
        }
        break;

      case "trailer":
        if (!value) {
          message = "Vui lòng nhập trailer";
        } else if (
          !/^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(
            value
          )
        ) {
          message = "Trailer phải là URL hợp lệ";
        }
        break;

      case "moTa":
        if (!value) {
          message = "Vui lòng nhập mô tả";
        }
        break;

      case "ngayKhoiChieu":
        if (!value) {
          message = "Vui lòng nhập ngày khởi chiếu";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          message = "Ngày khởi chiếu phải có định dạng YYYY-MM-DD";
        }
        break;

      case "danhGia":
        if (!value) {
          message = "Vui lòng nhập đánh giá";
        } else if (!/^[0-9]{1,2}$/.test(value) || Number(value) > 10) {
          message = "Đánh giá phải là số từ 0 → 10";
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHinhAnh(file);
    if (file) {
      // Preview ảnh
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

  const partDate = (dateString) => {
    if (!dateString) return "";

    if (dateString.includes("T")) {
      return dateString.split("T")[0];
    }

    if (dateString.includes("/")) {
      const [day, month, yearWithTime] = dateString.split("/");
      const year = yearWithTime.split(" ")[0];
      return `${year}-${month}-${day}`;
    }

    return dateString;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("maPhim", formValue.maPhim);
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
    if (hinhAnhFile) {
      formData.append("File", hinhAnhFile);
    }

    dispatch(EditMovie(formData));
  };

  return (
    <div className="mt-10">
      <h1 className="text-center font-bold text-3xl">Chỉnh sửa Phim</h1>
      <div className="container mx-auto mt-10 items-center flex justify-center">
        <div className="w-[60%]">
          <form onSubmit={handleSubmit} className="text-black">
            <div className="grid gap-4 mb-4 grid-cols-2">
              {/* Tên phim */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-black">
                  Tên Phim
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="tenPhim"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập tên phim"
                  required
                  value={formValue.tenPhim}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.tenPhim}
                </span>
              </div>

              {/* Trailer */}
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Trailer
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="trailer"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập trailer"
                  value={formValue.trailer}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.trailer}
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
                  onBlur={hanldeOnblur}
                  type="date"
                  name="ngayKhoiChieu"
                  className="w-full rounded-xl border px-4 py-2"
                  value={formValue.ngayKhoiChieu}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.ngayKhoiChieu}
                </span>
              </div>

              {/* Đánh giá */}
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Đánh giá
                </label>
                <input
                  min={0}
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="number"
                  name="danhGia"
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập đánh giá"
                  value={formValue.danhGia}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.danhGia}
                </span>
              </div>

              {/* Mã nhóm */}
              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-black">
                  Mã nhóm
                </label>
                <input
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  type="text"
                  name="maNhom"
                  value={formValue.maNhom}
                  className="w-full rounded-xl border px-4 py-2"
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.maNhom}
                </span>
              </div>

              {/* Mô tả */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-black">
                  Mô tả
                </label>
                <textarea
                  onChange={handleOnchange}
                  onBlur={hanldeOnblur}
                  name="moTa"
                  rows={4}
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Nhập mô tả phim"
                  value={formValue.moTa}
                />
                <span className="text-red-500 text-sm block whitespace-pre-line">
                  {erroeMess.moTa}
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
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
