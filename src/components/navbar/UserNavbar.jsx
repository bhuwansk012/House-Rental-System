import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { getProfile } from "../../service/profileService";
import { toast } from "react-toastify";

const UserNavbar = () => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const name=sessionStorage.getItem("isAuthenticated");
  const role = sessionStorage.getItem("role");

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getProfile();

      const formattedData = {
        ...data,
        image: data?.images ? `http://localhost:8080${data.images}` : null,
      };

      setProfile(formattedData);

    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition-all duration-300 text-gray-700 hover:text-orange-500 
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] 
     after:bg-orange-500 after:transition-all after:duration-300 ${
       isActive
         ? "text-orange-500 after:w-full"
         : "after:w-0 hover:after:w-full"
     }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-orange-500"
        >
          House<span className="text-gray-800">Rent</span>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10 font-medium">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/properties" className={navLinkClass}>Properties</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
        </ul>

        {/* Auth Section */}
        {isAuthenticated && role === "TENANT" ? (
          <div className="hidden md:block">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-5 py-2 rounded-full 
              bg-white border border-gray-300 
              text-blue-900 font-medium
              shadow-sm hover:shadow-md
              hover:bg-blue-900 hover:text-white
              transition-all duration-300"
            >
              {profile?.image ? (
                <img
                  src={profile.image}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <RxAvatar size={22} />
              )}

              <span>{name || "User"}</span>
            </Link>
          </div>
        ) : (
          <div className="hidden md:block">
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl font-medium border border-gray-300 text-blue-900 hover:bg-gray-500 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          </div>
        )}

      </nav>
    </header>
  );
};

export default UserNavbar;