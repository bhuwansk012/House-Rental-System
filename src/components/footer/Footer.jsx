import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* --- BRAND COLUMN --- */}
        <div className="space-y-6">
          <Link to="/" className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rotate-45" />
            </div>
            House<span className="text-indigo-500">Rent</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Redefining the rental experience in Nepal. We connect quality tenants with verified owners through a seamless digital ecosystem.
          </p>
          <div className="flex space-x-3">
            {[
              { Icon: FaFacebookF, link: "#" },
              { Icon: FaInstagram, link: "#" },
              { Icon: FaTwitter, link: "#" },
              { Icon: FaLinkedinIn, link: "#" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link}
                className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-slate-800"
              >
                <social.Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* --- QUICK LINKS --- */}
        <div>
          <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Navigation</h3>
          <ul className="space-y-4 text-sm font-bold">
            <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home Discovery</Link></li>
            <li><Link to="/properties" className="hover:text-indigo-400 transition-colors">Browse Listings</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400 transition-colors">Our Mission</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Get in Touch</Link></li>
          </ul>
        </div>

        {/* --- SUPPORT --- */}
        <div>
          <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Support & Legal</h3>
          <ul className="space-y-4 text-sm font-bold">
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">FAQ</li>
          </ul>
        </div>

        {/* --- CONTACT INFO --- */}
        <div className="space-y-6">
          <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Contact</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
               <FiMapPin className="text-indigo-500 mt-1" />
               <p className="text-sm font-medium text-slate-300">New Baneshwor,<br />Kathmandu, Nepal</p>
            </div>
            <div className="flex items-center gap-4">
               <FiMail className="text-indigo-500" />
               <p className="text-sm font-medium text-slate-300">hello@renthouse.com</p>
            </div>
            <div className="flex items-center gap-4">
               <FiPhone className="text-indigo-500" />
               <p className="text-sm font-medium text-slate-300">+977 1 4567890</p>
            </div>
          </div>
        </div>

      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="mt-12 border-t border-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <p>© {new Date().getFullYear()} HouseRent Labs. Built for the future of living.</p>
          <div className="flex gap-8">
             <span className="hover:text-white cursor-pointer transition-colors">Status: System Online</span>
             <span className="hover:text-white cursor-pointer transition-colors">English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;