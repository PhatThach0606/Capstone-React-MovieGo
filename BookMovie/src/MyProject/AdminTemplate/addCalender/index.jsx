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

  const heThongRap = useSelector((state) => state.SystemTheaterReducer.data);
  const ListcumRap = useSelector((state) => state.GroupTheatherReducer.data);
  const success = useSelector((state) => state.CalenderReducer.data);
  const error = useSelector((state) => state.CalenderReducer.error);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (success) {
      setMessage("Tạo lịch chiếu thành công!");
      setTimeout(() => dispatch(resetCalenderState()), 1000);
    } else if (error) {
      const msg = error?.response?.data?.content || "Tạo lịch chiếu thất bại!";
      setMessage(msg);
      setTimeout(() => dispatch(resetCalenderState()), 1000);
    }
  }, [success, error, dispatch]);

  const [dataMovie, setDataMovie] = useState({
    maPhim: movie.maPhim,
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: 0,
  });

  useEffect(() => {
    dispatch(SystemTheater());
  }, [dispatch]);

  useEffect(() => {
    if (maHeThonRap) {
      dispatch(GroupTheather(maHeThonRap));
    }
  }, [dispatch, maHeThonRap]);

  const handleTheterChange = (e) => {
    setMaHeThongRap(e.target.value);
  };

  const handleGroupTheterChange = (e) => {
    const value = e.target.value;
    setDataMovie({
      ...dataMovie,
      maRap: value,
    });
  };
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

  const [erroeMess, setErroMess] = useState({
    ngayChieuGioChieu: "",
    giaVe: "",
  });

  const hanldeOnblur = (e) => {
    const { name, value } = e.target;
    let message = "";

    switch (name) {
      case "ngayChieuGioChieu":
        if (!value) {
          message = "Vui lòng nhập ngày giờ khởi chiếu";
        }

        break;

      case "giaVe":
        if (!value) {
          message = "Vui lòng nhập giá vé";
        } else if (!/^\d+$/.test(value)) {
          message = "Giá vé phải là số nguyên";
        } else if (Number(value) < 75000 || Number(value) > 200000) {
          message = "Giá vé phải từ 75,000 đến 200,000";
        }
        break;

      default:
        if (!value) message = `Vui lòng nhập ${name}`;
        break;
    }

    setErroMess({
      ...erroeMess,
      [name]: message,
    });
  };

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

  return (
    <div className="mt-5 container mx-auto px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-6">
        Tạo lịch Chiếu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
        {/* Phần ảnh phim */}
        <div className="lg:col-span-3 flex justify-center items-center">
          <div>
            <img
              className="w-full sm:w-[250px] md:w-[300px] lg:w-[350px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[450px] rounded-lg shadow-md object-cover"
              src={movie.hinhAnh}
              alt={movie.tenPhim}
            />
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-center pt-4">
              {movie.tenPhim}
            </h4>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200">
          <form onSubmit={handleSubmit}>
            {message && (
              <div className="text-center mb-5 text-amber-500 font-bold text-lg sm:text-xl">
                {message}
              </div>
            )}

            {/* Hệ thống rạp */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
              <label
                htmlFor="cinema-system"
                className="w-full sm:w-40 text-gray-600 font-medium mb-2 sm:mb-0"
              >
                Hệ thống rạp:
              </label>
              <select
                onChange={handleTheterChange}
                id="cinema-system"
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 h-10"
              >
                <option>Chọn hệ thống rạp</option>
                {renderSystemTheater()}
              </select>
            </div>

            {/* Cụm rạp */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
              <label
                htmlFor="cinema-cluster"
                className="w-full sm:w-40 text-gray-600 font-medium mb-2 sm:mb-0"
              >
                Cụm rạp:
              </label>
              <select
                onChange={handleGroupTheterChange}
                name="maRap"
                id="cinema-cluster"
                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 h-10"
              >
                <option>Chọn cụm rạp</option>
                {renderGroupTheater()}
              </select>
            </div>

            {/* Ngày giờ chiếu */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
              <label
                htmlFor="show-date-time"
                className="w-full sm:w-40 text-gray-600 font-medium mb-2 sm:mb-0"
              >
                Ngày & giờ chiếu:
              </label>
              <div className="ml-7 flex flex-col w-full sm:flex-row sm:items-center sm:space-x-4">
                <input
                  onBlur={hanldeOnblur}
                  onChange={handleOnchange}
                  type="datetime-local"
                  id="show-date-time"
                  name="ngayChieuGioChieu"
                  className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 h-10"
                />
                <span className="text-red-500 text-sm mt-1 sm:mt-0">
                  {erroeMess.ngayChieuGioChieu}
                </span>
              </div>
            </div>

            {/* Giá vé */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
              <label
                htmlFor="ticket-price"
                className="w-full sm:w-40 text-gray-600 font-medium mb-2 sm:mb-0"
              >
                Giá vé:
              </label>
              <div className=" ml-7 flex flex-col w-full sm:flex-row sm:items-center sm:space-x-4 ">
                <input
                  onBlur={hanldeOnblur}
                  onChange={handleOnchange}
                  type="number"
                  id="ticket-price"
                  name="giaVe"
                  placeholder="Nhập giá vé"
                  className="flex-grow p-2 block border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 h-10"
                />
                <span className="text-red-500 text-sm mt-1 sm:mt-0">
                  {erroeMess.giaVe}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mt-6">
              <label className="w-full sm:w-40 text-gray-600 font-medium mb-2 sm:mb-0">
                Chức năng:
              </label>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-150 ease-in-out w-full sm:w-auto"
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
