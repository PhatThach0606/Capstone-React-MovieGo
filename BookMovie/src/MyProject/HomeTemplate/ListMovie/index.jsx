import Movie from "./movie";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./slice";
import Loading from "@components/Loading";

export default function ListMovie() {
  const state = useSelector((state) => state.listMovieReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const renderListMovie = () => {
    const { data } = state;
    return data?.map((item) => {
      return <Movie key={item.maPhim} data={item} />;
    });
  };

  if (state.loading) return <Loading />;

  return (
    <div className="container mx-auto grid grid-cols-4 gap-10">
      {renderListMovie()}
    </div>
  );
}
