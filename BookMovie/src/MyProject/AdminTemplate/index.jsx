import Navbar from "./_components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import Sidebar from "./_components/Sidebar";

export default function AdminTemplate() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="hidden lg:block lg:col-span-2 xl:w-80">
        <Sidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="col-span-12 lg:col-span-10 flex flex-col">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 transition-all duration-300 ">
          <Outlet />
        </main>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
