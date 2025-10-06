import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SystemTheater } from "./HethongRap";
import { GroupTheather } from "./CumRapTheoHeThong";
import { useLocation } from "react-router-dom";
import { CreateCalender } from "./TaoLichChieu";

export default function AddCalender() {
  const location = useLocation();
  const movie = location.state;
  const dispatch = useDispatch();

  const [maHeThonRap, setMaHeThongRap] = useState("");
  const [danhSachRapTheoCum, setDanhSachRapTheoCum] = useState([]);

  const heThongRap = useSelector((state) => state.SystemTheaterReducer.data);
  const ListcumRap = useSelector((state) => state.GroupTheatherReducer.data);

  const [dataMovie, setDataMovie] = useState({
    maPhim: movie.maPhim,
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: 0,
  });

  // Lấy hệ thống rạp
  useEffect(() => {
    dispatch(SystemTheater());
  }, [dispatch]);

  // Khi chọn hệ thống rạp → gọi API lấy cụm rạp
  useEffect(() => {
    if (maHeThonRap) {
      dispatch(GroupTheather(maHeThonRap));
    }
  }, [dispatch, maHeThonRap]);

  // Khi danh sách rạp thay đổi → cập nhật maRap (dạng JSON string)
  useEffect(() => {
    const maRapPhim = danhSachRapTheoCum.map((rap) => rap.maRap);
    setDataMovie((prev) => ({
      ...prev,
      maRap: JSON.stringify(maRapPhim),
    }));
  }, [danhSachRapTheoCum]);

  // chọn hệ thống rạp
  const handleTheterChange = (e) => {
    setMaHeThongRap(e.target.value);
  };

  // chọn cụm rạp
  const handleGroupTheterChange = (e) => {
    const value = e.target.value;
    const cumRapChon = ListcumRap?.find((cumRap) => cumRap.maCumRap === value);
    if (cumRapChon) {
      setDanhSachRapTheoCum(cumRapChon.danhSachRap);
    } else {
      setDanhSachRapTheoCum([]);
    }
  };

  // Format datetime từ input sang dd/MM/yyyy hh:mm:ss
  const formatDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const pad = (n) => (n < 10 ? "0" + n : n);

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  // Xử lý thay đổi input
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    if (name === "ngayChieuGioChieu") {
      const formattedDate = formatDateTime(value);
      setDataMovie({ ...dataMovie, [name]: formattedDate });
    } else {
      setDataMovie({
        ...dataMovie,
        [name]: name === "giaVe" ? Number(value) : value,
      });
    }
  };

  // Gửi dữ liệu tạo lịch chiếu
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateCalender(dataMovie));
  };

  // Render hệ thống rạp
  const renderSystemTheater = () => {
    return heThongRap?.map((systemTheater) => (
      <option
        key={systemTheater.maHeThongRap}
        value={systemTheater.maHeThongRap}
      >
        {systemTheater.tenHeThongRap}
      </option>
    ));
  };

  // Render cụm rạp
  const renderGroupTheater = () => {
    return ListcumRap?.map((groupTheater) => (
      <option key={groupTheater.maCumRap} value={groupTheater.maCumRap}>
        {groupTheater.tenCumRap}
      </option>
    ));
  };

  console.log("🎬 Dữ liệu gửi đi:", dataMovie);

  return (
    <div className="mt-5 container mx-auto">
      <h1 className="text-5xl text-center font-bold">Tạo lịch Chiếu</h1>

      <div className="grid grid-cols-7 mt-10">
        {/* Cột hình ảnh phim */}
        <div className="col-span-3 text-black flex justify-center items-center">
          <div>
            <img
              className="w-[350px] h-[450px] rounded-lg shadow-md"
              src={movie.hinhAnh}
              alt={movie.tenPhim}
            />
            <h4 className="text-xl font-bold text-center pt-5">
              {movie.tenPhim}
            </h4>
          </div>
        </div>

        {/* Form tạo lịch chiếu */}
        <div className="col-span-4 max-w-3xl bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Hệ thống rạp */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="cinema-system"
                className="w-40 flex-shrink-0 text-gray-600 font-medium"
              >
                Hệ thống rạp:
              </label>
              <select
                onChange={handleTheterChange}
                id="cinema-system"
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm 
                     focus:ring-blue-500 focus:border-blue-500 appearance-none 
                     bg-white text-gray-700 h-10 cursor-pointer"
              >
                <option>Chọn hệ thống rạp</option>
                {renderSystemTheater()}
              </select>
            </div>

            {/* Cụm rạp */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="cinema-cluster"
                className="w-40 flex-shrink-0 text-gray-600 font-medium"
              >
                Cụm rạp:
              </label>
              <select
                onChange={handleGroupTheterChange}
                id="cinema-cluster"
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm 
                     focus:ring-blue-500 focus:border-blue-500 appearance-none 
                     bg-white text-gray-700 h-10 cursor-pointer"
              >
                <option>Chọn cụm rạp</option>
                {renderGroupTheater()}
              </select>
            </div>

            {/* Ngày chiếu giờ chiếu */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="show-date-time"
                className="w-40 flex-shrink-0 text-gray-600 font-medium"
              >
                Ngày & giờ chiếu:
              </label>
              <input
                onChange={handleOnchange}
                type="datetime-local"
                id="show-date-time"
                name="ngayChieuGioChieu"
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm 
                    focus:ring-blue-500 focus:border-blue-500 text-gray-700 h-10"
              />
            </div>

            {/* Giá vé */}
            <div className="flex items-center mb-6">
              <label
                htmlFor="ticket-price"
                className="w-40 flex-shrink-0 text-gray-600 font-medium"
              >
                Giá vé:
              </label>
              <input
                onChange={handleOnchange}
                type="number"
                id="ticket-price"
                name="giaVe"
                placeholder="Nhập giá vé"
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm 
                    focus:ring-blue-500 focus:border-blue-500 text-gray-700 h-10"
              />
            </div>

            <div className="flex items-center mt-8">
              <label className="w-40 flex-shrink-0 text-gray-600 font-medium">
                Chức năng:
              </label>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md 
                     shadow-md transition duration-150 ease-in-out"
              >
                Tạo lịch chiếu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
