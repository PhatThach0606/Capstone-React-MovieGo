import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import RequireLoginModal from "../_components/RequireLoginModal";

export default function Movie(props) {
  const { data } = props;
  const rating = typeof data?.danhGia === "number" ? data.danhGia : null;
  const canBook = !!data?.dangChieu;
  const [showRequireLogin, setShowRequireLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="relative overflow-hidden">
        <img
          className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
          src={data.hinhAnh}
          alt={data.tenPhim}
          onError={(e) => {
            e.currentTarget.src = "/image/firm.png";
          }}
        />

        {rating !== null && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded-md shadow">
            ⭐ {rating}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3 px-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {canBook ? (
            <button
              className="pointer-events-auto inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 shadow"
              onClick={() => {
                const isLoggedIn = !!localStorage.getItem("user");
                if (!isLoggedIn) {
                  setShowRequireLogin(true);
                  return;
                }
                // Từ danh sách phim không có maLichChieu, chuyển sang trang chi tiết để chọn suất chiếu
                navigate(`/detail/${data.maPhim}`);
              }}
            >
              Đặt vé
            </button>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Chưa mở bán"
              className="pointer-events-none inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-400 rounded-lg cursor-not-allowed shadow"
            >
              Chưa mở bán
            </button>
          )}
          <Link
            to={`/detail/${data.maPhim}`}
            className="pointer-events-auto inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow"
          >
            Chi tiết
          </Link>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem] dark:text-white">
          {data.tenPhim}
        </h3>
      </div>
    </div>
    <RequireLoginModal open={showRequireLogin} onClose={() => setShowRequireLogin(false)} />
    </>
  );
}
