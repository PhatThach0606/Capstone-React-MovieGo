import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Nền mờ khi sidebar mở */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto bg-[#0F172A] transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} 
          lg:translate-x-0 md:w-60 xl:w-80`}
      >
        <h5
          id="drawer-navigation-label"
          className="text-xl font-bold border-b border-b-[#F5C518] pb-2 text-white"
        >
          <li>
            <div className="flex items-center p-2">
              <a
                href="#"
                className="flex items-center justify-center w-14 h-14 border border-[#F5C518] bg-gradient-to-b from-[#4B0082] to-[#D32F2F] rounded-full"
              >
                <img src="./../image/logo.png" className="h-10" alt="logo" />
              </a>
            </div>
          </li>
        </h5>

        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium text-white">
            {/* USER */}
            <li>
              <details className="group">
                <summary className="flex items-center cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                  <i className="fa-solid fa-user w-5"></i>
                  <span className="ml-3 flex-1">User</span>
                  <i className="fa-solid fa-chevron-down text-xs group-open:rotate-180 transition-transform"></i>
                </summary>
                <ul className="pl-8 mt-2 space-y-1">
                  <li>
                    <NavLink
                      to="/admin/add-user"
                      className="block p-2 hover:bg-gray-700 rounded"
                    >
                      Thêm người dùng
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/list-user"
                      className="block p-2 hover:bg-gray-700 rounded"
                    >
                      Danh sách người dùng
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>

            {/* PHIM */}
            <li>
              <details className="group">
                <summary className="flex items-center cursor-pointer p-2 hover:bg-gray-700 rounded-lg">
                  <i className="fa-solid fa-film w-5"></i>
                  <span className="ml-3 flex-1">Phim</span>
                  <i className="fa-solid fa-chevron-down text-xs group-open:rotate-180 transition-transform"></i>
                </summary>
                <ul className="pl-8 mt-2 space-y-1">
                  <li>
                    <NavLink
                      to="/admin/adminpage"
                      className="block p-2 hover:bg-gray-700 rounded"
                    >
                      Tất cả Phim
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/addfilm"
                      className="block p-2 hover:bg-gray-700 rounded"
                    >
                      Thêm phim mới
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
