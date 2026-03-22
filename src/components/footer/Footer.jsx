import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 border-t border-slate-900 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* --- BRAND --- */}
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-extrabold text-white flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <div className="w-3 h-3 bg-white rotate-45" />
            </div>
            House<span className="text-indigo-500">Rent</span>
          </Link>

          <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
            Redefining rentals in Nepal. Connecting tenants and owners through a seamless digital platform.
          </p>

          {/* Socials */}
          <div className="flex gap-3">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* --- NAVIGATION --- */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-[0.25em] text-[11px] mb-6">
            Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home Discovery", path: "/" },
              { name: "Browse Listings", path: "/properties" },
              { name: "Our Mission", path: "/about" },
              { name: "Contact", path: "/contact" }
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:text-indigo-400 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-indigo-400 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- CONTACT --- */}
        <div className="space-y-6">
          <h3 className="text-white font-bold uppercase tracking-[0.25em] text-[11px] mb-6">
            Contact
          </h3>

          <div className="space-y-4 text-sm">

            <div className="flex items-start gap-3">
              <FiMapPin className="text-indigo-500 mt-1" />
              <p className="text-slate-300">
                New Baneshwor <br /> Kathmandu, Nepal
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-indigo-500" />
              <p className="text-slate-300">hello@renthouse.com</p>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone className="text-indigo-500" />
              <p className="text-slate-300">+977 1 4567890</p>
            </div>

          </div>
        </div>

        {/* --- NEWSLETTER (NEW) --- */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-[0.25em] text-[11px] mb-6">
            Stay Updated
          </h3>

          <p className="text-sm text-slate-400 mb-4">
            Get latest properties and updates directly in your inbox.
          </p>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent px-4 py-3 text-sm text-white outline-none w-full"
            />
            <button className="bg-indigo-600 px-4 py-3 text-white text-sm hover:bg-indigo-500 transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* --- BOTTOM --- */}
      <div className="border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">

          <p>
            © {new Date().getFullYear()} HouseRent. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
            <span className="hover:text-white cursor-pointer transition">System Online</span>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;