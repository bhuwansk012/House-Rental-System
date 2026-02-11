import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-300 mx-auto w-380">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            House<span className="text-orange-500">Rent</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Find your perfect rental house with ease. Trusted listings, verified
            owners, and simple booking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">Home</li>
            <li className="hover:text-orange-500 cursor-pointer">Properties</li>
            <li className="hover:text-orange-500 cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">Help Center</li>
            <li className="hover:text-orange-500 cursor-pointer">Terms of Service</li>
            <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-orange-500 cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm mb-4">Kathmandu, Nepal</p>
          <p className="text-sm mb-4">Email: support@renthouse.com</p>

          <div className="flex space-x-4">
            <a className="p-2 bg-blue-900 rounded-full hover:bg-orange-500 transition cursor-pointer">
              <FaFacebookF />
            </a>
            <a className="p-2 bg-blue-900 rounded-full hover:bg-orange-500 transition cursor-pointer">
              <FaInstagram />
            </a>
            <a className="p-2 bg-blue-900 rounded-full hover:bg-orange-500 transition cursor-pointer">
              <FaTwitter />
            </a>
            <a className="p-2 bg-blue-900 rounded-full hover:bg-orange-500 transition cursor-pointer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className=" py-4 text-center text-sm">
        © {new Date().getFullYear()} RentHouse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
