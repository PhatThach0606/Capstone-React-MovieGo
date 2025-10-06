import { useDispatch } from "react-redux";
import { AddFilm } from "./slice";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function AddNewFilm() {
  const loading = useSelector((state) => state.AddFilmReducer.loading);
  const data = useSelector((state) => state.AddFilmReducer.data);

  const dispatch = useDispatch();
  const [hinhAnh, setHinhAnh] = useState(null);
  const [formValue, setformValue] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    trailer: "",
    moTa: "",
    maNhom: "",
    ngayKhoiChieu: "",
    danhGia: "",
    hot: false,
    dangChieu: false,
    sapChieu: false,
  });
  const handleOnchange = (e) => {
    const { name, value, checked, type } = e.target;
    setformValue({
      ...formValue,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleFileChange = (e) => {
    setHinhAnh(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let movie in formValue) {
      formData.append(movie, formValue[movie]);
    }
    if (hinhAnh) {
      formData.append("File", hinhAnh, hinhAnh.name);
    }

    dispatch(AddFilm(formData));
  };
  //   const dispatch = useDispatch();

  //   const formData = new FormData();
  //   formData.append("maPhim", values.maPhim);
  //   formData.append("tenPhim", values.tenPhim);
  //   formData.append("biDanh", values.biDanh);
  //   formData.append("trailer", values.trailer);
  //   formData.append("hinhAnh", values.hinhAnh);
  //   formData.append("moTa", values.moTa);
  //   formData.append("maNhom", values.maNhom);
  //   formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
  //   formData.append("danhGia", values.danhGia);
  //   formData.append("hot", values.hot);
  //   formData.append("dangChieu", values.dangChieu);
  //   formData.append("sapChieu", values.sapChieu);

  //   dispatch(AddFilm(formData));

  return (
    <div className="container mx-auto mt-10 items-center flex justify-center">
      <div className=" w-[60%] ">
        <form onSubmit={handleSubmit} className="text-black">
          <div className="grid gap-4 mb-4 grid-cols-2">
            {/* Tên phim */}
            <div className="col-span-2">
              <label
                htmlFor="tenPhim"
                className="block mb-2 text-sm font-medium text-black"
              >
                Tên Phim
              </label>
              <input
                onChange={handleOnchange}
                type="text"
                name="tenPhim"
                id="tenPhim"
                className="w-full rounded-xl border px-4 py-2 text-black placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                placeholder="Nhập tên phim"
                required
              />
            </div>

            {/* Mã phim */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Mã phim
              </label>
              <input
                onChange={handleOnchange}
                type="text"
                name="maPhim"
                id="maPhim"
                className="w-full rounded-xl border  px-4 py-2 text-black placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition"
                placeholder="Nhập mã phim"
                required
              />
            </div>

            {/* Bí danh */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Bí danh Phim
              </label>
              <input
                onChange={handleOnchange}
                type="text"
                name="biDanh"
                id="biDanh"
                className="w-full rounded-xl border  px-4 py-2 text-black placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition"
                placeholder="Nhập bí danh"
                required
              />
            </div>

            {/* Trailer */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Trailer
              </label>
              <input
                onChange={handleOnchange}
                value={formValue.trailer}
                type="text"
                name="trailer"
                id="trailer"
                className="w-full rounded-xl border  px-4 py-2 text-black placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
                placeholder="Nhập trailer"
                required
              />
            </div>

            {/* Hình ảnh */}
            <div className="col-span-1 ">
              <label className="block mb-2 text-sm font-medium text-black">
                Hình ảnh
              </label>
              <input
                className="block w-full text-sm text-black border  rounded-lg cursor-pointer   dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                name="hinhAnh"
                id="hinhAnh"
              />
            </div>

            {/* Ngày khởi chiếu */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Ngày khởi chiếu
              </label>
              <input
                onChange={handleOnchange}
                value={formValue.ngayKhoiChieu}
                type="date"
                name="ngayKhoiChieu"
                id="ngayKhoiChieu"
                className="w-full rounded-xl border  px-4 py-2 text-black placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none transition"
                required
              />
            </div>

            {/* Đánh giá */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Đánh giá
              </label>
              <input
                onChange={handleOnchange}
                type="number"
                name="danhGia"
                id="danhGia"
                className="w-full rounded-xl border  px-4 py-2 text-black placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none transition"
                placeholder="Nhập đánh giá"
                required
              />
            </div>

            {/* Độ hot */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Độ hot
              </label>
              <input
                onChange={handleOnchange}
                checked={formValue.hot}
                type="checkbox"
                name="hot"
                id="hot"
                className=" rounded border border-black  px- py-2 text-black  focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none transition"
                required
              />
            </div>

            {/* Công bố */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block mb-2 text-sm font-medium text-black">
                Công bố
              </label>
              <div className="flex gap-5">
                <div className="flex gap-2 justify-center items-center">
                  <label
                    className="block  text-sm font-medium text-black"
                    htmlFor=""
                  >
                    Sắp chiếu
                  </label>
                  <input
                    onChange={handleOnchange}
                    checked={formValue.sapChieu}
                    name="sapChieu"
                    id="sapChieu"
                    className=" rounded border border-black  px-2 py-2 text-black  focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none transition"
                    type="checkbox"
                  />
                </div>
                <div className=" flex gap-2 justify-center items-center">
                  <label
                    className="block  text-sm font-medium text-black"
                    htmlFor="dangChieu"
                  >
                    Đang chiếu
                  </label>
                  <input
                    onChange={handleOnchange}
                    checked={formValue.dangChieu}
                    name="dangChieu"
                    id="dangChieu"
                    className=" rounded border border-black  px-2 py-2 text-black  focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none transition"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>

            {/* Mã nhóm */}
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-medium black">
                Mã Nhóm
              </label>
              <input
                onChange={handleOnchange}
                type="text"
                name="maNhom"
                id="maNhom"
                className="w-full rounded-xl border  px-4 py-2 text-black placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition"
                placeholder="Nhập mã nhóm"
                required
              />
            </div>

            {/* Mô tả phim */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-black">
                Mô tả phim
              </label>
              <textarea
                onChange={handleOnchange}
                id="moTa"
                name="moTa"
                rows={4}
                className="w-full rounded-xl border px-4 py-2 text-black placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition"
                placeholder="Nhập mô tả phim"
              />
            </div>
          </div>

          {/* Submit button */}

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2.5 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
          >
            {loading ? (
              <div role="status">
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
