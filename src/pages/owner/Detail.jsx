import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../service/ownerService';
import { motion, AnimatePresence } from 'framer-motion';
import {Link} from 'react-router-dom';
import { 
  HiOutlineLocationMarker, HiOutlineHome, 
  HiArrowLeft, HiOutlineShare, HiOutlineHeart, HiOutlineLightningBolt
} from 'react-icons/hi'; 
import { BiBed, BiBath, BiCar, BiArea, BiCheckShield } from 'react-icons/bi';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);
        const data = response; 
        console.log("Fetched property data:", data);
        const formattedImages = Array.isArray(data.images) 
          ? data.images.map(img => `http://localhost:8080/uploads/properties/${img}`)
          : [];

        setProperty({ ...data, imageUrls: formattedImages });
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentMainImage = property.imageUrls[activeImageIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900"
    >
      {/* --- PREMIUM NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-350 mx-auto px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-xs font-black uppercase tracking-widest">Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
              Property ID: #{property.id.toString().slice(-5)}
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-350 mx-auto px-8 mt-12 space-y-8">
        
        {/* --- SECTION 1: HORIZONTAL HERO (IMAGE + MAIN INFO) --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Gallery - Left Side */}
          <div className="lg:w-2/3 space-y-4">
            <div className="relative h-125 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentMainImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={currentMainImage || 'https://via.placeholder.com/800x500'} 
                  className="w-full h-full object-cover" 
                />
              </AnimatePresence>
              
              <div className="absolute bottom-8 left-8 flex gap-3">
                <span className="px-5 py-2 bg-white/90 backdrop-blur text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {property.bookingStatus}
                </span>
                <span className="px-5 py-2 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                  <HiOutlineLightningBolt /> {property.status}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto p-2 no-scrollbar">
              {property.imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative shrink-0 w-32 h-20 rounded-2xl overflow-hidden border-4 transition-all ${
                    activeImageIndex === index ? 'border-indigo-600 scale-105' : 'border-white opacity-70'
                  }`}
                  >
                  <img src={url} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))
            }    
            </div>
          </div>

          {/* Core Info - Right Side */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-indigo-600 mb-4 bg-indigo-50 w-fit px-4 py-1.5 rounded-full">
                <HiOutlineLocationMarker />
                <span className="text-[10px] font-black uppercase tracking-widest">{property.district},{property.municipality},{property.tole}</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4">{property.title}</h1>
              <p className="text-slate-500 font-medium flex items-center gap-2 mb-8">
                <BiCheckShield className="text-emerald-500 text-xl" /> 
                Verified Property Listing
              </p>
              
              <div className="py-6 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rent</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900">Rs. {property.price.toLocaleString()}</span>
                  <span className="text-slate-400 font-bold">/month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: HORIZONTAL SPECS (ICON GRID) --- */}
        <div className="bg-white p-4 rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center divide-x divide-slate-100">
            {[
              { label: 'Bedrooms', val: property.bedrooms, icon: <BiBed size={28}/> },
              { label: 'Bathrooms', val: property.bathrooms, icon: <BiBath size={28}/> },
              { label: 'Living Area', val: `${property.area} sqft`, icon: <BiArea size={28}/> },
              { label: 'Car Parking', val: property.parkingAvailable ? "Available" : "N/A", icon: <BiCar size={28}/> },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center py-6 hover:bg-slate-50 transition-colors cursor-default">
                <div className="text-indigo-500 mb-3">{item.icon}</div>
                <p className="text-xl font-black text-slate-900">{item.val}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 3: DESCRIPTION (FULL WIDTH SEPARATE DIV) --- */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2 bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Property Overview</h2>
            </div>
            <p className="text-slate-600 leading-[2.2] text-lg whitespace-pre-line font-medium">
              {property.description}
            </p>
          </div>
        </div>
        {!property.payment_status&&(
          <div>
            <Link to={`/payment/esewa/${property.id}`} className="bg-green-400 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors">
              Make Payment
            </Link>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default Detail;