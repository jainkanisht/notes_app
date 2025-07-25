import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg px-6 py-4 flex justify-between items-center flex-wrap mb-9">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 text-2xl font-extrabold text-blue-700 tracking-tight">
        <div className="bg-blue-100 p-2 rounded-full shadow-sm">
          <PencilSquareIcon className="h-6 w-6 text-blue-600" />
        </div>
        <span className="drop-shadow-sm">PasteBook</span>
      </div>

      {/* Nav Links */}
      <div className="flex gap-6 text-md mt-2 sm:mt-0">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-600 hover:text-blue-600 transition duration-300"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 font-semibold border-b-2 border-blue-600 pb-1"
              : "text-gray-600 hover:text-blue-600 transition duration-300"
          }
        >
          Pastes
        </NavLink>

        {location.pathname.startsWith("/pastes/") &&
          location.pathname !== "/pastes" && (
            <span className="text-blue-700 font-semibold border-b-2 border-blue-600 pb-1">
              View
            </span>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
