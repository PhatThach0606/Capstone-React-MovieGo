import Navbar from "./_components/navbar";
import Footer from "./_components/Footer";
import { Outlet } from "react-router-dom";

export default function HomeTemplate() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
