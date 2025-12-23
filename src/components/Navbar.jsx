import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const menuItems = ["Home", "Properties", "About", "Contact"];

  return (
    <>
      {/* ================= Navbar ================= */}
      <header className="sticky top-0 z-30 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

          {/* Logo */}
          <h1 className="text-xl sm:text-2xl font-bold text-orange-500 tracking-wide">
            House Rental System
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 text-lg font-medium">
              {menuItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActive(item)}
                    className={`relative pb-1 transition-all duration-300
                      ${active === item
                        ? "text-orange-500 after:w-full"
                        : "text-gray-700 hover:text-orange-500 after:w-0"}
                      after:absolute after:left-0 after:-bottom-1
                      after:h-0.5 after:bg-orange-500 after:transition-all`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            {/* Profile */}
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full
              bg-gray-500 text-white hover:bg-gray-600 transition text-sm"
            >
              <CgProfile className="text-xl" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl text-gray-500"
            onClick={() => setOpen(true)}
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </header>

      {/* ================= Overlay ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= Sidebar ================= */}
      <aside
        className={`fixed top-0 right-0 h-full z-50
        w-full sm:w-80 md:w-72
        bg-white/30 backdrop-blur-xl shadow-2xl
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative p-6 space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h3>Account</h3>
            <MdOutlineClose
              className="text-2xl cursor-pointer text-gray-600 hover:text-red-500 transition"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Mobile Nav Links */}
          <ul className="md:hidden space-y-4 text-lg">
            {menuItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setActive(item);
                    setOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition
                    ${active === item
                      ? "bg-orange-100 text-orange-600"
                      : "hover:bg-orange-50"}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* Account Section */}
          <div className="pt-4 border-t">
            <ul className="space-y-3 text-lg">
              {["Login", "Register", "Profile"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block px-4 py-2 rounded-lg
                    hover:bg-orange-100 hover:text-orange-600 transition "
                    onClick={()=>setOpen(false)}
                  >
                    {item}

                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Navbar;
