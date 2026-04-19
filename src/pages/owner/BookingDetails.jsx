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
      
      // Logic to handle both array of images or a single imageUrl
      let propertyImages = [];
      if (data.property.images && data.property.images.length > 0) {
        propertyImages = data.property.images.map(img => `${baseUrl}${img}`);
      } else if (data.property.imageUrl) {
        propertyImages = [`${baseUrl}${data.property.imageUrl}`];
      }

      setBooking({
        ...data,
        property: {
          ...data.property,
          imageUrls: propertyImages
        }
      });
    } catch (error) {
      toast.error("Failed to load booking details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const handleReleaseBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to release this booking? This property will become available for new tenants.")) return;
    
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
      className="min-h-screen bg-[#f8f9fc] pb-20 font-sans"
    >
      {/* Premium Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center text-slate-900 font-bold hover:text-blue-600 transition-all"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Return to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Ref ID
            </span>
            <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl font-mono text-xs font-bold border border-slate-200">
              #{id.slice(-8).toUpperCase()}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery Component */}
            <div className="space-y-6">
              <div className="relative h-137.5 rounded-[3rem] overflow-hidden shadow-2xl bg-slate-200 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg] || "https://via.placeholder.com/1200x800?text=No+Image"}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                    alt="Property view"
                  />
                </AnimatePresence>

                {/* Gallery UI Overlays */}
                <div className="absolute top-8 left-8 flex gap-3">
                  <StatusBadge status={booking.status} />
                  <div className="bg-black/40 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl text-[11px] font-black flex items-center gap-2 border border-white/10">
                    <FiLayers /> {images.length > 0 ? activeImg + 1 : 0} / {images.length}
                  </div>
                </div>

                {images.length > 1 && (
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button 
                      onClick={() => setActiveImg(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="pointer-events-auto bg-white/10 hover:bg-white backdrop-blur-xl p-4 rounded-full text-white hover:text-blue-600 transition-all shadow-2xl border border-white/20"
                    >
                      <FiChevronLeft size={28} />
                    </button>
                    <button 
                      onClick={() => setActiveImg(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="pointer-events-auto bg-white/10 hover:bg-white backdrop-blur-xl p-4 rounded-full text-white hover:text-blue-600 transition-all shadow-2xl border border-white/20"
                    >
                      <FiChevronRight size={28} />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {images.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImg(idx)}
                      className={`relative shrink-0 w-32 h-24 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                        activeImg === idx 
                        ? 'border-blue-600 scale-105 shadow-xl shadow-blue-200' 
                        : 'border-white hover:border-slate-200'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest">
                    <FiMapPin className="mr-2" /> {booking.property.municipality}, {booking.property.district}
                  </div>
                  <h1 className="text-5xl font-black text-slate-900 leading-tight">
                    {booking.property.title}
                  </h1>
                </div>
                <div className="bg-slate-900 text-white px-10 py-6 rounded-[2.5rem] text-3xl font-black shadow-2xl flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-1">Monthly</span>
                  Rs. {booking.property.price.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <SpecItem icon={<FiHome />} label="Total Area" value={`${booking.property.area} sqft`} />
                <SpecItem icon={<FiLayers />} label="Bedrooms" value={booking.property.bedrooms} />
                <SpecItem icon={<FiLayers />} label="Bathrooms" value={booking.property.bathrooms} />
                <SpecItem icon={<FiCheckCircle />} label="Parking" value={booking.property.parkingAvailable ? "Available" : "No"} />
              </div>

              <div className="mt-12 pt-12 border-t border-slate-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                  <h3 className="text-2xl font-black text-slate-900">Property Overview</h3>
                </div>
                <p className="text-slate-500 leading-loose text-lg whitespace-pre-line">
                  {booking.property.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Tenant Information Card */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                <FiUser size={250} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <FiUser className="text-blue-600" /> Tenant Profile
              </h3>
              <div className="space-y-6">
                <ContactCard icon={<FiUser />} label="Full Name" value={booking.tenant.fullName} />
                <ContactCard icon={<FiMail />} label="Email Address" value={booking.tenant.email} />
                <ContactCard icon={<FiPhone />} label="Phone Number" value={booking.phone} />
              </div>
            </div>

            {/* Management Actions Card */}
            <div className="bg-blue-600 rounded-[3rem] p-4 shadow-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                {booking.status === 'BOOKED' ? (
                  <motion.button 
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isReleasing}
                    onClick={() => handleReleaseBooking(booking.id)}
                    className="w-full flex items-center justify-center gap-3 bg-white text-red-600 py-6 rounded-4xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-red-50 transition-all disabled:opacity-50"
                  >
                    <FiTrash2 size={20} />
                    {isReleasing ? "Processing..." : "Release Property"}
                  </motion.button>
                ) : (
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-4xl text-center border border-white/20">
                    <FiCheckCircle size={48} className="mx-auto mb-4 text-emerald-400" />
                    <p className="font-black uppercase text-[10px] tracking-widest text-emerald-300">Property {booking.status}</p>
                  </div>
                )}
              </div>
              
              {/* Visual background element */}
              <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            </div>
          </div>

        </div>
      </main>
    </motion.div>
  );
};

// Internal Helper Components
const SpecItem = ({ icon, label, value }) => (
  <div className="bg-slate-50 p-6 rounded-4xl text-center group hover:bg-blue-600 transition-all duration-300 border border-slate-100 hover:border-blue-600">
    <div className="text-blue-600 mb-3 flex justify-center text-3xl group-hover:scale-110 group-hover:text-white transition-all">
      {icon}
    </div>
    <p className="text-slate-400 text-[9px] uppercase font-black tracking-widest mb-1 group-hover:text-blue-100 transition-colors">
      {label}
    </p>
    <p className="font-black text-slate-900 text-lg group-hover:text-white transition-colors">
      {value}
    </p>
  </div>
);

const ContactCard = ({ icon, label, value }) => (
  <div className="flex items-center p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-600 mr-5 shadow-sm text-xl">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[4px] text-slate-300 font-black uppercase tracking-widest mb-1">{label}</p>
      <p className="font-black text-slate-900 truncate text-sm">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => (
  <div className={`flex items-center px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md border border-white/20 ${
    status === 'BOOKED' ? 'bg-emerald-500/90 text-white' : 'bg-orange-500/90 text-white'
  }`}>
    <span className="w-2.5 h-2.5 rounded-full bg-white mr-3 animate-pulse" />
    {status}
  </div>
);

const LoadingScreen = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
      className="w-24 h-24 border-8 border-blue-600 border-t-transparent rounded-full shadow-2xl" 
    />
    <p className="mt-10 text-slate-400 font-black uppercase tracking-[0.3em] animate-pulse text-xs">
      Loading Property Data
    </p>
  </div>
);

export default BookingDetails;