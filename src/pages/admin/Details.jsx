import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Bed, Bath, Maximize, CheckCircle, 
  ArrowLeft, Mail, ShieldCheck, Car, ZoomIn, X, Phone, Calendar
} from "lucide-react";
import { veiwProperty } from "../../service/adminService";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  const BASE_URL = "http://localhost:8080/uploads/";

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await veiwProperty(id);
      setProperty(res.data);
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );

  if (!property) return <div className="p-10 text-center text-red-500 font-medium">Property not found.</div>;

  // Since you requested "only one image", we take the first image if multiple are provided.
  const images = property.imageUrl?.split(",") || [];
  const singleImage = images[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-7xl mx-auto px-6 py-10 font-sans text-slate-900"
    >
      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={40} strokeWidth={1.5} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={selectedImg} 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              alt="Zoomed View"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation & Badges */}
      <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm border border-slate-100 group-hover:bg-indigo-50 transition-colors">
            <ArrowLeft size={18} />
          </div>
          Back to Listings
        </button>
        <div className="flex gap-2">
          <Badge color="indigo">{property.type}</Badge>
          <Badge color={property.bookingStatus === 'AVAILABLE' ? 'emerald' : 'orange'}>
            {property.bookingStatus}
          </Badge>
        </div>
      </nav>

      {/* Hero Title Section */}
      <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-slate-500 bg-white w-fit px-4 py-2 rounded-full border border-slate-100 shadow-sm">
            <MapPin size={18} className="text-rose-500" />
            <span className="text-sm font-medium">{property.tole}, Ward {property.wardNo}, {property.municipality}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-500/5 border border-indigo-50 lg:text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Investment</p>
          <div className="flex lg:justify-end items-baseline gap-1">
            <span className="text-3xl font-black text-indigo-600">Rs. {property.price.toLocaleString()}</span>
            <span className="text-slate-400 font-medium text-sm">/month</span>
          </div>
        </div>
      </div>

      {/* Hero Single Image */}
      <section className="mb-16">
        <div 
          className="relative overflow-hidden rounded-3xl cursor-zoom-in group h-125"
          onClick={() => setSelectedImg(`${BASE_URL}properties/${singleImage}`)}
        >
          <img 
            src={`${BASE_URL}properties/${singleImage}`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt="Property Hero" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
              <ZoomIn size={20}/>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Amenities Grid */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <div className="w-2 h-8 bg-indigo-600 rounded-full" /> Key Features
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <AmenityCard icon={<Bed size={24}/>} label="Bedrooms" value={property.bedrooms} />
              <AmenityCard icon={<Bath size={24}/>} label="Bathrooms" value={property.bathrooms} />
              <AmenityCard icon={<Maximize size={24}/>} label="Total Area" value={`${property.area} sqft`} />
              <AmenityCard icon={<Car size={24}/>} label="Parking" value={property.parkingAvailable ? "Yes" : "No"} />
            </div>
          </section>

          {/* Description */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold">Property Overview</h3>
            <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                   <span className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20" />
                  {property.description}
                </p>
            </div>
          </section>

          {/* Legal Documents */}
          <section className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
                <ShieldCheck size={200} />
            </div>
            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
              <ShieldCheck className="text-indigo-400" /> Verified Ownership
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
              <DocPreview 
                title="Citizenship Front" 
                src={`${BASE_URL}documents/${property.citizenFrontPath}`} 
                onZoom={setSelectedImg} 
              />
              <DocPreview 
                title="Citizenship Back" 
                src={`${BASE_URL}documents/${property.citizenBackPath}`} 
                onZoom={setSelectedImg} 
              />
            </div>
          </section>
        </div>

        {/* Sidebar - Owner Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16" />
              
              <div className="relative z-10 text-center">
                <div 
                  className="w-28 h-28 mx-auto rounded-3xl overflow-hidden ring-4 ring-white shadow-2xl cursor-zoom-in mb-6 group"
                  onClick={() => setSelectedImg(`${BASE_URL}documents/${property.passportPhotoPath}`)}
                >
                  <img src={`${BASE_URL}documents/${property.passportPhotoPath}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Owner" />
                </div>
                
                <h4 className="text-2xl font-black text-slate-900">{property.ownerName}</h4>
                <p className="text-indigo-600 font-semibold mb-6">Property Owner</p>
                
                <div className="space-y-3 text-left bg-slate-50 p-5 rounded-2xl mb-8 border border-slate-100">
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <Mail size={16} className="text-indigo-500" /> {property.ownerEmail}
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-sm">
                    <Phone size={16} className="text-indigo-500" /> {property.ownerPhone}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100">
                   <span className="text-xs font-bold text-emerald-700 uppercase">Verification Status</span>
                   <span className="flex items-center text-emerald-600 font-black text-xs uppercase">
                      <CheckCircle size={14} className="mr-1" /> {property.status}
                   </span>
                </div>

                <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                   <Calendar size={18} /> Schedule a Tour
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* --- HELPER COMPONENTS --- */

const Badge = ({ children, color }) => {
  const styles = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[color]}`}>
      {children}
    </span>
  );
};

const AmenityCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
    <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">{label}</p>
      <p className="text-xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

const DocPreview = ({ title, src, onZoom }) => (
  <div className="space-y-4 group">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/80">{title}</span>
    <div 
      onClick={() => onZoom(src)}
      className="aspect-video bg-white/5 rounded-4xl overflow-hidden border border-white/10 relative cursor-zoom-in group-hover:border-indigo-500/50 transition-all shadow-2xl"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-indigo-600/20 backdrop-blur-[2px] transition-all z-10">
         <div className="bg-white p-3 rounded-full text-indigo-600 shadow-xl">
            <ZoomIn size={24} />
         </div>
      </div>
      <img src={src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={title} />
    </div>
  </div>
);

export default Details;