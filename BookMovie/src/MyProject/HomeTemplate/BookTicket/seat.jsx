import React from "react";
import "./seat.css";

export default function Seat({ seat, selected = false, onToggle }) {
  const isBooked = !!seat?.daDat;
  const isVip = !!seat?.loaiGhe && seat.loaiGhe.toLowerCase().includes("vip");

  const handleClick = () => {
    if (isBooked) return;
    if (typeof onToggle === "function") onToggle(seat);
  };

  const cls = [
    "seat-btn",
    isBooked ? "booked" : "available",
    selected ? "selected" : "",
    isVip ? "vip" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      title={isBooked ? "Đã đặt" : seat?.tenGhe}
      className={cls}
      onClick={handleClick}
      disabled={isBooked}
    >
      {seat?.tenGhe}
    </button>
  );
}
