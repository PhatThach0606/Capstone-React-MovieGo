import { useParams, Link } from "react-router-dom";
import { fetchDetailMovie } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function DetailMovie() {
  const state = useSelector((state) => state.detailReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetailMovie(id));
  }, [id]);

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Có lỗi xảy ra
          </h2>
          <p className="text-gray-600 mb-4">Không thể tải thông tin phim</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const movie = state.data;

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Không tìm thấy phim
          </h2>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {movie.tenPhim}
            </h1>
            <p className="text-lg md:text-xl opacity-90">{movie.biDanh}</p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(movie.danhGia / 2)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-lg font-semibold">
                  {movie.danhGia}/10
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  movie.dangChieu
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {movie.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={movie.hinhAnh}
                  alt={movie.tenPhim}
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.src = "/image/banner.jpg";
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {movie.danhGia}/10
                    </span>
                    <span className="text-sm text-gray-500">
                      {movie.maPhim}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Ngày khởi chiếu:
                      </span>
                      <p className="text-gray-900">
                        {new Date(movie.ngayKhoiChieu).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Thời lượng:
                      </span>
                      <p className="text-gray-900">
                        {movie.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Thông tin phim
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Tên phim:
                    </span>
                    <p className="text-lg text-gray-900 font-semibold">
                      {movie.tenPhim}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Đánh giá:
                    </span>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(movie.danhGia / 2)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        ({movie.danhGia}/10)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mô tả</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {movie.moTa ||
                      "Chưa có mô tả chi tiết cho bộ phim này. Thông tin sẽ được cập nhật sớm nhất."}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Thông tin bổ sung
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Thông tin kỹ thuật
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mã phim:</span>
                        <span className="font-mono text-gray-900">
                          {movie.maPhim}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày khởi chiếu:</span>
                        <span className="text-gray-900">
                          {new Date(movie.ngayKhoiChieu).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">
                      Trạng thái
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Đang chiếu:</span>
                        <span
                          className={`font-medium ${
                            movie.dangChieu ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {movie.dangChieu ? "Có" : "Không"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sắp chiếu:</span>
                        <span
                          className={`font-medium ${
                            movie.sapChieu ? "text-blue-600" : "text-gray-500"
                          }`}
                        >
                          {movie.sapChieu ? "Có" : "Không"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="border-t pt-8">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        movie.dangChieu
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {movie.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        movie.sapChieu
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {movie.sapChieu ? "Sắp chiếu" : "Đã chiếu"}
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      to="/list-movie"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Quay lại
                    </Link>

                    <button
                      className={`inline-flex items-center px-6 py-2 rounded-lg transition-colors ${
                        movie.dangChieu
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                      disabled={!movie.dangChieu}
                      onClick={() => {
                        if (!movie.dangChieu) return;
                        const maLichChieu = movie?.lichChieu?.[0]?.maLichChieu || id;
                        window.location.href = `/book-ticket/${maLichChieu}`;
                      }}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      {movie.dangChieu ? "Đặt vé" : "Chưa mở bán"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
