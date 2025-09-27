import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav class=" bg-[#0F172A]">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen p-4 px-15 border border-b-grey-600 z-10">
          <a
            href="#"
            class="flex items-center space-x-3 rtl:space-x-reverse w-20 h-20 border-1 border-[#F5C518] bg-gradient-to-b from-[#4B0082]  to-[#D32F2F] rounded-[50%] leading-[50%]"
          >
            <img src="./image/logo.png" class="h-20" alt="#" />
          </a>
          <div className="md:flex md:flex-wrap md:justify-between md:items-center grid sm:grid-col-1 ">
            <div class="col-span-1  flex items-center space-x-6 rtl:space-x-reverse">
              <a
                href="#"
                class="text-sm  text-gray-500 dark:text-white hover:underline"
              >
                abc
              </a>
              <a
                href="#"
                class="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </a>
            </div>
            <div className="sm:pl-5  md:pl-10 row-span-1 pt- md:pt-0">
              <button
                type="button"
                class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                <NavLink to="/">Home</NavLink>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
