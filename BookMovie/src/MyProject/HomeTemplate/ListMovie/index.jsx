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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {renderListMovie()}
      </div>
    </div>
  );
}
