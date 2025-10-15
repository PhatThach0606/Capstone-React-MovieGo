import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../ListMovie/slice";
import Movie from "../ListMovie/movie";
import { Link, useNavigate } from "react-router-dom";
import RequireLoginModal from "../_components/RequireLoginModal";

export default function Homepage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listMovieReducer);
  const [showRequireLogin, setShowRequireLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const topFiveMovies = (data || []).slice(0, 5);

  return (
    <div>
      <img src="/image/banner.jpg" alt="banner" className="w-full" />
      <div className="container mx-auto mt-6">
        {!loading && (
          <div className="grid grid-cols-5 gap-6">
            {topFiveMovies.map((item) => (
              <Movie key={item.maPhim} data={item} />
            ))}
          </div>
        )}
      </div>
      <div className="container mx-auto mt-6 text-center">
        <button
          onClick={() => {
            const isLoggedIn = !!localStorage.getItem("user");
            if (isLoggedIn) {
              navigate("/list-movie");
            } else {
              setShowRequireLogin(true);
            }
          }}
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Xem thêm
        </button>
      </div>
      <RequireLoginModal open={showRequireLogin} onClose={() => setShowRequireLogin(false)} />
    </div>
  );
}
