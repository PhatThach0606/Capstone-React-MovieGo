import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderTime } from "./slice";
import RoomCalender from "../RoomCalender";

export default function ShowTime() {
  const Location = useLocation();

  const maPhim = Location.state?.maPhim || localStorage.getItem("maPhim");

  const dispatch = useDispatch();

  useEffect(() => {
    if (maPhim) {
      dispatch(renderTime(maPhim));
    }
  }, []);

  const { data, loading, error } = useSelector(
    (state) => state.ShowTimeReducer
  );

  const [cumRap, setCumRap] = useState(null);
  const [rapChieu, setRapChieu] = useState(null);
  const [MaLichChieu, setMaLichChieu] = useState([]);
  useEffect(() => {
    if (data?.heThongRapChieu?.length > 0) {
      const CumRapChieu = data.heThongRapChieu[0];
      const RapChieu = CumRapChieu?.cumRapChieu?.[0];

      if (RapChieu?.lichChieuPhim) {
        setCumRap(CumRapChieu);
        setRapChieu(RapChieu);
        setMaLichChieu(RapChieu.lichChieuPhim);
      }
    }
  }, [data]);

  const renderCumRap = () => {
    if (!cumRap) return null;
    return (
      <div className="container mx-auto my-10">
        <div className="flex justify-center items-center gap-2">
          <img className="w-[10%] h-[10%]" src={cumRap.logo} alt="" />
          <h1 className="font-bold text-center text-xl text-violet-900">
            {cumRap.tenHeThongRap}
          </h1>
        </div>
      </div>
    );
  };
  const renderRapChieu = () => {
    if (!rapChieu) return null;
    return (
      <div className="container mx-auto">
        <div className="font-bold text-xl text-center">
          Rạp phim: {rapChieu.tenCumRap}
        </div>
        <h1 className="font-semibold text-sm text-center">
          Địa chỉ: {rapChieu.diaChi}
        </h1>
      </div>
    );
  };
  return (
    <div className="">
      {renderCumRap()}

      {renderRapChieu()}
      <div className="container mx-auto mt-10">
        {MaLichChieu.length > 0 && <RoomCalender lichChieu={MaLichChieu} />}
      </div>
    </div>
  );
}
