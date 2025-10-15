import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderTime } from "./slice";
export default function ShowTime() {
  const Location = useLocation();

  const { maPhim } = Location.state;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(renderTime(maPhim));
  }, []);

  const { data, loading, error } = useSelector(
    (state) => state.ShowTimeReducer
  );

  if (data) {
    const { heThongRapChieu } = data;
    const renderRap = heThongRapChieu.map((cumRapChieu) => {
      return cumRapChieu;
    });

    const renderCumRapChieu = renderRap.map((lichChieuPhim) => {
      return lichChieuPhim;
    });

    const renderLichChieuPhim = renderCumRapChieu.map((renderCalender) => {
      return renderCalender;
    });
    console.log(renderLichChieuPhim);
  }

  return (
    <div>
      <h1>Show Time</h1>
    </div>
  );
}
