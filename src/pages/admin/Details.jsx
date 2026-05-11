import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Bed, Bath, Maximize, CheckCircle, 
  ArrowLeft, Mail, ShieldCheck, Car, ZoomIn, X, Phone, Calendar,
  ChevronLeft, ChevronRight, FileText, User
} from "lucide-react";
import { veiwProperty } from "../../service/adminService";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const BASE_URL = "http://localhost:8080/uploads/";

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await veiwProperty(id);
      // Backend returns imageUrl: ["img1.jpg", "img2.jpg"]
      const rawData = res.data;
      const formattedData = {
        ...rawData,
        // Pre-format the full paths for the main gallery
        galleryImages: Array.isArray(rawData.imageUrl) 
          ? rawData.imageUrl.map((img) => `${BASE_URL}properties/${img}`) 
          : []
      };
      setProperty(formattedData);
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
      />
    </div>
  );

  if (!property) return <div className="p-10 text-center text-red-500 font-medium">Property not found.</div>;

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % property.galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + property.galleryImages.length) % property.galleryImages.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-7xl mx-auto px-6 py-10 font-sans text-slate-900"
    >
      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white"><X size={40} /></button>
            <motion.img 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={selectedImg} 
              className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <nav className="mb-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
          <ArrowLeft size={20} /> Back to Listings
        </button>
        <div className="flex gap-2">
          <Badge color="indigo">{property.type}</Badge>
          <Badge color={property.bookingStatus === 'AVAILABLE' ? 'emerald' : 'orange'}>{property.bookingStatus}</Badge>
        </div>
      </nav>

      {/* Title & Price */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{property.title}</h1>
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={18} className="text-rose-500" />
            <span className="font-medium">{property.tole}, Ward {property.wardNo}, {property.municipality}</span>
          </div>
        </div>
        <div className="bg-indigo-600 text-white px-8 py-4 rounded-3xl shadow-lg shadow-indigo-200">
          <p className="text-[10px] font-bold uppercase opacity-80 tracking-widest">Monthly Rent</p>
          <span className="text-3xl font-black text-white">Rs. {property.price.toLocaleString()}</span>
        </div>
      </div>

      {/* --- MAIN GALLERY --- */}
      <section className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-10 relative aspect-video lg:h-137.5 overflow-hidden rounded-4xl bg-slate-200 group">
          {property.galleryImages.length > 0 ? (
            <>
              <motion.img
                key={activeImgIndex}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                src={property.galleryImages[activeImgIndex]}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setSelectedImg(property.galleryImages[activeImgIndex])}
              />
              {property.galleryImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all"><ChevronLeft /></button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all"><ChevronRight /></button>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">No Images Available</div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="lg:col-span-2 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar">
          {property.galleryImages.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveImgIndex(idx)}
              className={`relative shrink-0 w-24 h-24 lg:w-full lg:h-28 rounded-xl overflow-hidden cursor-pointer border-4 transition-all ${
                activeImgIndex === idx ? "border-indigo-600" : "border-transparent opacity-60"
              }`}
            >
              <img src={img} className="w-full h-full object-cover" alt="thumb" />
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-xl font-bold mb-6">Interior Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <AmenityCard icon={<Bed />} label="Bedrooms" value={property.bedrooms} />
              <AmenityCard icon={<Bath />} label="Bathrooms" value={property.bathrooms} />
              <AmenityCard icon={<Maximize />} label="Area" value={`${property.area} sqft`} />
              <AmenityCard icon={<Car />} label="Parking" value={property.parkingAvailable ? "Yes" : "No"} />
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-100">
               {property.description}
            </p>
          </section>
        </div>

        {/* Sidebar Quick Contact */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 text-white p-8 rounded-4xl sticky top-8">
            <h4 className="text-xl font-bold mb-6">Contact Owner</h4>
            <div className="space-y-4 mb-8">
               <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
                  <User size={18} className="text-indigo-400" />
                  <span className="font-medium">{property.ownerName}</span>
               </div>
               <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
                  <Phone size={18} className="text-indigo-400" />
                  <span className="font-medium">{property.ownerPhone}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- HORIZONTAL BOTTOM SECTION: OWNER & DOCUMENTS --- */}
      <section className="pt-12 border-t border-slate-200">
        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
          <ShieldCheck className="text-emerald-500" /> Verification & Owner Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Owner Identity */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
            <div 
              className="w-20 h-20 rounded-2xl overflow-hidden cursor-zoom-in shrink-0"
              onClick={() => setSelectedImg(`${BASE_URL}documents/${property.passportPhotoPath}`)}
            >
              <img src={`${BASE_URL}documents/${property.passportPhotoPath}`} className="w-full h-full object-cover" alt="Owner" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Property Owner</p>
              <h4 className="text-lg font-black">{property.ownerName}</h4>
              <p className="text-sm text-slate-500">{property.ownerEmail}</p>
            </div>
          </div>

          {/* Doc 1 */}
          <DocHorizontal 
            title="Citizenship (Front)" 
            src={`${BASE_URL}documents/${property.citizenFrontPath}`} 
            onZoom={setSelectedImg} 
          />

          {/* Doc 2 */}
          <DocHorizontal 
            title="Citizenship (Back)" 
            src={`${BASE_URL}documents/${property.citizenBackPath}`} 
            onZoom={setSelectedImg} 
          />
        </div>
      </section>
    </motion.div>
  );
};

/* --- Component Helpers --- */

const Badge = ({ children, color }) => {
  const styles = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
  };
  return <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${styles[color]}`}>{children}</span>;
};

const AmenityCard = ({ icon, label, value }) => (
  <div className="bg-slate-50 p-5 rounded-2xl flex flex-col items-center text-center gap-2 border border-transparent hover:border-indigo-200 transition-all">
    <div className="text-indigo-500">{icon}</div>
    <p className="text-[10px] uppercase font-bold text-slate-400">{label}</p>
    <p className="font-bold text-slate-800">{value}</p>
  </div>
);

const DocHorizontal = ({ title, src, onZoom }) => (
  <div 
    onClick={() => onZoom(src)}
    className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-all group"
  >
    <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden shrink-0">
      <img src={src} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
        <FileText size={14} /> View Document
      </div>
    </div>
    <ZoomIn size={18} className="text-slate-300 group-hover:text-indigo-500" />
  </div>
);

export default Details;