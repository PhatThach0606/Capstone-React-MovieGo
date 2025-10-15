import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBoxOffice } from "./slice";

export default function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((s) => s.bookTicketReducer);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchBoxOffice(id));
  }, [dispatch, id]);

  const seats = useMemo(() => data?.danhSachGhe || [], [data]);

  const toggleSeat = (seat) => {
    if (seat.daDat) return;
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.maGhe === seat.maGhe);
      if (exists) return prev.filter((s) => s.maGhe !== seat.maGhe);
      return [...prev, seat];
    });
  };

  if (loading)
    return <div className="text-center py-10">Đang tải phòng vé...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-600">
        Lỗi tải dữ liệu: {String(error)}
      </div>
    );

  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="container mx-auto px-4 py-6 ">
      <div className="mb-4">
        <button
          className="px-4 py-2 rounded-lg border"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Chọn ghế</h1>

      <div className="grid grid-cols-10 gap-2 bg-slate-900 p-4 rounded-lg max-w-5xl">
        {seats.map((seat) => {
          const isSelected = selectedSeats.some((s) => s.maGhe === seat.maGhe);
          const base =
            "text-xs md:text-sm px-2 py-2 rounded-md text-white text-center";
          const cls = seat.daDat
            ? "bg-gray-500 cursor-not-allowed"
            : isSelected
            ? "bg-rose-600"
            : "bg-green-600 hover:bg-green-700 cursor-pointer";
          return (
            <button
              key={seat.maGhe}
              className={`${base} ${cls}`}
              onClick={() => toggleSeat(seat)}
              disabled={seat.daDat}
              title={seat.daDat ? "Đã đặt" : seat.tenGhe}
            >
              {seat.tenGhe}
            </button>
          );
        })}
      </div>

      <div className="mt-6 max-w-5xl">
        <h2 className="font-semibold mb-2">Ghế đã chọn</h2>
        <div className="flex flex-wrap gap-2">
          {selectedSeats.length === 0 && <span>Chưa chọn ghế</span>}
          {selectedSeats.map((s) => (
            <span
              key={s.maGhe}
              className="px-2 py-1 rounded bg-rose-100 text-rose-700 text-sm"
            >
              {s.tenGhe}
            </span>
          ))}
        </div>

        <button
          className={`mt-4 px-5 py-2 rounded-lg text-white ${
            selectedSeats.length === 0 || !isLoggedIn
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={selectedSeats.length === 0 || !isLoggedIn}
          onClick={() => {
            if (!isLoggedIn) {
              navigate("/sign-in");
              return;
            }
            alert(
              "Đặt vé demo: " + selectedSeats.map((s) => s.tenGhe).join(", ")
            );
          }}
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
}
