import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingById, bookingReleased } from '../../service/bookService';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  FiMapPin, FiCalendar, FiUser, FiPhone, 
  FiMail, FiHome, FiArrowLeft, FiInfo, FiTrash2, 
  FiLayers, FiChevronLeft, FiChevronRight, FiCheckCircle 
} from 'react-icons/fi';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReleasing, setIsReleasing] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const fetchBooking = async () => {
    try {
      const response = await getBookingById(id);
      const data = response.data;
      const baseUrl = "http://localhost:8080/uploads/properties/";
      
      let propertyImages = [];
      if (data.property.images && data.property.images.length > 0) {
        propertyImages = data.property.images.map(img => `${baseUrl}${img}`);
      } else if (data.property.imageUrl) {
        propertyImages = [`${baseUrl}${data.property.imageUrl}`];
      }

      setBooking({
        ...data,
        property: { ...data.property, imageUrls: propertyImages }
      });
    } catch (error) {
      toast.error("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooking(); }, [id]);

  const handleReleaseBooking = async (bookingId) => {
    if (!window.confirm("Release this booking? Property will become available.")) return;
    setIsReleasing(true);
    try { 
      await bookingReleased(bookingId);
      toast.success("Property successfully released!");
      navigate("/owner/bookings");
    } catch (error) {
      toast.error("Error releasing booking.");
    } finally {
      setIsReleasing(false);
    }
  };

  if (loading) return <LoadingScreen />;

  const images = booking.property.imageUrls || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-white pb-20 font-sans"
    >
      {/* 1. STICKY HEADER */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="group flex items-center text-slate-900 font-bold hover:text-blue-600 transition-all">
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          <div className="flex items-center gap-4">
            <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-mono text-xs font-bold">
              BOOKING ID: {id.slice(-8).toUpperCase()}
            </span>
          </div>
        </div>
      </nav>

      {/* 2. HERO GALLERY SECTION (Full Width) */}
      <section className="w-full px-6 py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-150 rounded-[3rem] overflow-hidden shadow-2xl bg-slate-200">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={images[activeImg] || "https://via.placeholder.com/1200x800?text=No+Image"}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute top-8 left-8 flex gap-3">
              <StatusBadge status={booking.status} />
            </div>

            {images.length > 1 && (
              <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                <NavButton icon={<FiChevronLeft />} onClick={() => setActiveImg(prev => (prev === 0 ? images.length - 1 : prev - 1))} />
                <NavButton icon={<FiChevronRight />} onClick={() => setActiveImg(prev => (prev === images.length - 1 ? 0 : prev + 1))} />
              </div>
            )}
          </div>

          {/* Thumbnails Horizontal Row */}
          <div className="flex gap-4 mt-6 overflow-x-auto pb-2 no-scrollbar">
            {images.map((img, idx) => (
              <button key={idx} onClick={() => setActiveImg(idx)} className={`shrink-0 w-40 h-24 rounded-2xl overflow-hidden border-4 transition-all ${activeImg === idx ? 'border-blue-600 scale-105' : 'border-transparent opacity-60'}`}>
                <img src={img} className="w-full h-full object-cover" alt="thumb" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROPERTY TITLE & SPECS (Full Width) */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-12">
            <div>
              <div className="flex items-center text-blue-600 font-bold text-sm tracking-widest uppercase mb-4">
                <FiMapPin className="mr-2" /> {booking.property.municipality}, {booking.property.district}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900">{booking.property.title}</h1>
            </div>
            <div className="text-right">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Monthly Investment</p>
              <p className="text-5xl font-black text-blue-600">Rs. {booking.property.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <SpecItem icon={<FiHome />} label="Total Area" value={`${booking.property.area} sqft`} />
            <SpecItem icon={<FiLayers />} label="Bedrooms" value={booking.property.bedrooms} />
            <SpecItem icon={<FiLayers />} label="Bathrooms" value={booking.property.bathrooms} />
            <SpecItem icon={<FiCheckCircle />} label="Parking" value={booking.property.parkingAvailable ? "Yes" : "No"} />
          </div>
        </div>
      </section>

      {/* 4. TENANT DETAILS (Horizontal Section) */}
      <section className="py-16 px-6 bg-gray-50 text-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-8 bg-blue-500 rounded-full" />
            <h3 className="text-3xl font-black italic">Tenant Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-4xl border border-white/10 backdrop-blur-sm">
              <FiUser className="text-blue-400 mb-4" size={32} />
              <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Full Name</p>
              <p className="text-xl font-bold">{booking.tenant.fullName}</p>
            </div>
            <div className="bg-white/5 p-8 rounded-4xl border border-white/10 backdrop-blur-sm">
              <FiMail className="text-blue-400 mb-4" size={32} />
              <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Email Address</p>
              <p className="text-xl font-bold">{booking.tenant.email}</p>
            </div>
            <div className="bg-white/5 p-8 rounded-4xl border border-white/10 backdrop-blur-sm">
              <FiPhone className="text-blue-400 mb-4" size={32} />
              <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">Contact Number</p>
              <p className="text-xl font-bold">{booking.phone}</p>
            </div>
          </div>
        </div>
        <FiUser className="absolute -bottom-20 -right-20 text-white/3" size={400} />
      </section>

      {/* 5. OVERVIEW & ACTION (Final Horizontal Section) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black text-slate-900 mb-8">Property Description</h3>
            <p className="text-slate-500 text-xl leading-relaxed whitespace-pre-line">
              {booking.property.description}
            </p>
          </div>
          
          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
            <h4 className="text-center font-black uppercase tracking-widest text-xs mb-8 text-slate-400">Management Action</h4>
            {booking.status === 'BOOKED' ? (
              <button 
                disabled={isReleasing}
                onClick={() => handleReleaseBooking(booking.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-3xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-100"
              >
                <FiTrash2 /> {isReleasing ? "RELEASING..." : "RELEASE PROPERTY"}
              </button>
            ) : (
              <div className="text-center">
                <FiCheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
                <p className="font-black text-slate-900">PROPERTY RELEASED</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// Sub-components
const NavButton = ({ icon, onClick }) => (
  <button onClick={onClick} className="pointer-events-auto bg-white/20 hover:bg-white backdrop-blur-xl p-5 rounded-full text-white hover:text-blue-600 transition-all border border-white/20">
    {React.cloneElement(icon, { size: 24 })}
  </button>
);

const SpecItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
    <div className="text-blue-600 text-3xl">{icon}</div>
    <div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => (
  <div className={`px-6 py-3 rounded-2xl text-[12px] font-black tracking-widest flex items-center gap-3 backdrop-blur-md ${status === 'BOOKED' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}`}>
    <div className="w-2 h-2 rounded-full bg-white animate-pulse" /> {status}
  </div>
);

const LoadingScreen = () => (
  <div className="h-screen flex items-center justify-center bg-white">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default BookingDetails;