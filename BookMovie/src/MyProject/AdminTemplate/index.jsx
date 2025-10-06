import Navbar from "./_components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import Sidebar from "./_components/Sidebar";

export default function AdminTemplate() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-5">
        <div className="h-screen overflow-hidden">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
