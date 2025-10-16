import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoxOffice } from "./slice";
import { useLocation, useNavigate } from "react-router-dom";
import Seat from "./seat";
import "./seat.css";

export default function BookTicket() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const maLichChieu =
    location.state?.maLichChieu || localStorage.getItem("maLichChieu");

  useEffect(() => {
    if (maLichChieu) dispatch(fetchBoxOffice(maLichChieu));
  }, [maLichChieu]);

  const { data, error, loading } = useSelector(
    (state) => state.bookTicketSlice
  );

  const seats = data?.danhSachGhe || [];

  // Local selection state: array of seat objects
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    // if already booked, ignore
    if (seat.daDat) return;
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.maGhe === seat.maGhe);
      if (exists) return prev.filter((s) => s.maGhe !== seat.maGhe);
      return [...prev, seat];
    });
  };

  const total = useMemo(() => {
    if (!selectedSeats || selectedSeats.length === 0) return 0;
    // Example: use 'gia' property if present; otherwise default price 75000
    return selectedSeats.reduce((sum, s) => sum + (s.gia || 75000), 0);
  }, [selectedSeats]);

  const isLoggedIn = !!localStorage.getItem("user");

  const handleBook = () => {
    if (!isLoggedIn) {
      navigate("/sign-in");
      return;
    }
    if (selectedSeats.length === 0) return;
    // For now, simulate booking and mark seats as booked locally
    alert(
      `Đặt vé demo: ${selectedSeats.map((s) => s.tenGhe).join(", ")} - Tổng: ` +
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(total)
    );
    // mark them as booked in local UI
    // (note: real booking should call API QuanLyDatVe/DatVe with proper token and payload)
    selectedSeats.forEach((sel) => {
      const idx = seats.findIndex((s) => s.maGhe === sel.maGhe);
      if (idx >= 0) seats[idx].daDat = true;
    });
    setSelectedSeats([]);
  };

  if (loading) return <div className="p-6">Đang tải thông tin ghế...</div>;
  if (error) return <div className="p-6 text-red-600">Lỗi: {error}</div>;

  // Build a simple grid grouped by row (tenHang) when available
  // If tenHang not present, simply render in 10 columns

  return (
    <div className="bookpage">
      <div className="mb-4">
        <button
          className="px-4 py-2 rounded-lg border"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>

      <div className="screen-banner">Màn hình</div>

      <div className="main-layout">
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div className="row-labels" style={{ marginTop: 18 }}>
            {[].map((r) => (
              <div key={r} style={{ width: 46, textAlign: "center" }}>
                {r}
              </div>
            ))}
          </div>

          <div className="seat-grid-wrapper">
            <div className="col-numbers">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <div className="seat-grid">
              {seats.map((seat) => (
                <Seat
                  key={seat.maGhe}
                  seat={seat}
                  selected={!!selectedSeats.find((s) => s.maGhe === seat.maGhe)}
                  onToggle={toggleSeat}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="seat-legend">
            <div className="legend-item">
              <span className="legend-swatch swatch-booked" />
              Ghế đã đặt
            </div>
            <div className="legend-item">
              <span className="legend-swatch swatch-selected" />
              Ghế đang chọn
            </div>
            <div className="legend-item">
              <span className="legend-swatch swatch-available" />
              Ghế chưa đặt
            </div>
          </div>

          <div style={{ height: 24 }} />

          <div className="booking-panel">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#374151", color: "#f59e0b" }}>
                  <th style={{ padding: 12, textAlign: "left" }}>Số ghế</th>
                  <th style={{ padding: 12 }}>Giá</th>
                  <th style={{ padding: 12 }}>Hủy</th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ padding: 12 }}>
                      Chưa chọn ghế
                    </td>
                  </tr>
                )}
                {selectedSeats.map((s) => (
                  <tr key={s.maGhe}>
                    <td style={{ padding: 12 }}>{s.tenGhe}</td>
                    <td style={{ padding: 12 }}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(s.gia || 75000)}
                    </td>
                    <td style={{ padding: 12 }}>
                      <button
                        onClick={() => toggleSeat(s)}
                        style={{
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          padding: "6px 8px",
                          borderRadius: 6,
                        }}
                      >
                        Hủy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 12, fontWeight: 800, color: "#f59e0b" }}>
              Tổng tiền:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </div>

            <div style={{ marginTop: 16 }}>
              <button
                className="book-button"
                onClick={handleBook}
                disabled={selectedSeats.length === 0}
              >
                Đặt ghế
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
