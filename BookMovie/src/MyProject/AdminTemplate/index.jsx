import Navbar from "./_components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import { useState } from "react";
import Sidebar from "./_components/Sidebar";

export default function AdminTemplate() {
  useEffect(() => {
    initFlowbite();
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 xl:ml-80 lg:ml-60 md:ml-0  transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
