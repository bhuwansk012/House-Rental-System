import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../service/ownerService';
import { motion } from 'framer-motion';
import {bookingFree} from '../../service/bookService';
import { 
  HiOutlineLocationMarker, HiOutlineHome, 
  HiOutlineArrowsExpand, HiArrowLeft, HiCalendar, HiOutlineShare, HiOutlineHeart
} from 'react-icons/hi'; 
import { BiBed, BiBath, BiCar, BiBuildings, BiArea } from 'react-icons/bi';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  // --- Logic: Google Maps Navigation ---
  const handleNavigate = () => {
    if (!property) return;
    const destination = `${property.tole}, ${property.municipality}, ${property.district}, Nepal`;
    // Fixed the URL to use the official Google Maps directions format
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);
        // Assuming response is the object itself based on your previous snippet
        const data = response; 
        const formattedData = {
          ...data,
          image: data.imageUrl
            ? `http://localhost:8080/uploads/properties/${data.imageUrl}`
            : null
        };
        setProperty(formattedData);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#FBFDFF] pb-20 font-sans text-slate-900"
    >
      {/* --- Sticky Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-xs font-black uppercase tracking-widest">Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm text-slate-500">
              <HiOutlineShare size={20} />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors shadow-sm text-slate-500">
              <HiOutlineHeart size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* --- Left Column: Visuals & Description --- */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Image Hero Section */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/5 bg-white aspect-[16/9]"
            >
              {property.image ? (
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                  <HiOutlineHome size={100} />
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {property.status}
                </span>
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {property.bookingStatus}
                </span>
              </div>
            </motion.div>

            {/* Title & Description Card */}
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <HiOutlineLocationMarker size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">{property.district}, {property.municipality}</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 leading-tight">{property.title}</h1>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line opacity-90">
                {property.description}
              </p>
              
              <div className="mt-12 pt-8 border-t border-slate-50 flex gap-10">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Posted Date</p>
                  <p className="font-bold text-slate-700">{new Date(property.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Property ID</p>
                  <p className="font-bold text-slate-700">#{id.slice(-6).toUpperCase()}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#0F172A] p-10 rounded-[3.5rem] text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <HiOutlineLocationMarker className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold">Location</h3>
              </div>
              <div className="space-y-4 mb-8 opacity-80">
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Street</p>
                  <p className="font-bold">{property.tole}, Ward {property.wardNo}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Region</p>
                  <p className="font-bold">{property.municipality}, {property.district} Nepal</p>
                </div>
              </div>
              <button 
                onClick={handleNavigate}
                className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Get Directions
              </button>
            </div>
          </div>

          {/* --- Right Column: Pricing & Quick Specs --- */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Price Card */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-28">
              <div className="text-center mb-10">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Monthly Rent</p>
                <div className="flex items-center justify-center">
                  <span className="text-5xl font-black text-slate-900">Rs.{property.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Specs Bento Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Beds', val: property.bedrooms, icon: <BiBed /> },
                  { label: 'Baths', val: property.bathrooms, icon: <BiBath /> },
                  { label: 'Area', val: `${property.area} ft²`, icon: <BiArea /> },
                  { label: 'Parking', val: property.parkingAvailable ? "Yes" : "No", icon: <BiCar /> },
                  { label: 'Furnished', val: property.furnished ? "Yes" : "No", icon: <BiBuildings /> },
                  { label: 'House #', val: property.houseNo, icon: <HiOutlineHome /> }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-3xl border border-transparent hover:border-blue-100 transition-all group">
                    <div className="text-blue-500 mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <p className="text-base font-black text-slate-900">{item.val}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{item.label}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 bg-slate-900 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                Edit Details
              </button>
            </div>

            
          </aside>

        </div>
      </div>
    </motion.div>
  );
};

export default Detail;