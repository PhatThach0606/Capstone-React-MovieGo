import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function RoomCalender(props) {
  const { lichChieu } = props;
  const { error, loading } = useSelector((state) => state.bookTicketSlice);
  return (
    <div className="my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-600 uppercase">
        Danh sách lịch chiếu
      </h2>

      {loading && (
        <div className="text-center text-blue-500 mb-4">
          Đang tải dữ liệu...
        </div>
      )}
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lichChieu.map((item) => (
          <li
            key={item.maLichChieu}
            className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">
                  Mã lịch chiếu:
                </span>{" "}
                {item.maLichChieu}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Rạp:</span>{" "}
                {item.tenRap}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Giá vé:</span>{" "}
                <span className="text-green-600 font-semibold">
                  {item.giaVe.toLocaleString("vi-VN")} ₫
                </span>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Giờ chiếu:</span>{" "}
                {new Date(item.ngayChieuGioChieu).toLocaleString("vi-VN")}
              </p>

              <Link to="/book-ticket" state={{ maLichChieu: item.maLichChieu }}>
                <button
                  onClick={() =>
                    localStorage.setItem("maLichChieu", item.maLichChieu)
                  }
                  type="button"
                  className="cursor-pointer w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
                >
                  🎟️ Đặt vé ngay
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
