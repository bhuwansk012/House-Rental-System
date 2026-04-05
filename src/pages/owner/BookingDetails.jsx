import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingById } from '../../service/bookService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, FiCalendar, FiUser, FiPhone, 
  FiMail, FiHome, FiCheckCircle, FiArrowLeft 
} from 'react-icons/fi'; // Optional: npm install react-icons

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    try {
      const response = await getBookingById(id);
      const data = response.data;

      const formattedData = {
        ...data,
        property: {
          ...data.property,
          image: data.property.imageUrl
            ? "http://localhost:8080/uploads/properties/" + data.property.imageUrl
            : null
        }
      };

      setBooking(formattedData);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Booking <span className="text-blue-600">Details</span>
          </h1>
          <p className="text-gray-500 mt-2">Reference ID: #{id}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Image & Main Info */}
          <motion.div variants={itemVars} className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative h-96 overflow-hidden">
                {booking.property.image ? (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={booking.property.image}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiHome size={48} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {booking.property.type}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-gray-800">{booking.property.title}</h2>
                  <p className="text-2xl font-bold text-blue-600">Rs. {booking.property.price}</p>
                </div>

                <div className="flex items-center text-gray-500 mb-6">
                  <FiMapPin className="mr-2" />
                  <span>
                    {booking.property.municipality} - {booking.property.wardNo}, {booking.property.tole}, {booking.property.district}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {booking.property.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-gray-50">
                  <div className="text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Area</p>
                    <p className="font-semibold">{booking.property.area} sq.ft</p>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Bedrooms</p>
                    <p className="font-semibold">{booking.property.bedrooms}</p>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Bathrooms</p>
                    <p className="font-semibold">{booking.property.bathrooms}</p>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <p className="text-gray-400 text-xs uppercase tracking-wider">Parking</p>
                    <p className="font-semibold">{booking.property.parkingAvailable ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Tenant & Status Sidebar */}
          <motion.div variants={itemVars} className="space-y-6">
            
            {/* Status Card */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Booking Status</h3>
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {booking.status}
                </span>
                <FiCheckCircle className={booking.status === 'Confirmed' ? 'text-green-500' : 'text-orange-500'} size={24} />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-2" />
                <span>Booked on {new Date(booking.property.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Tenant Info Card */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Tenant Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                    <FiUser />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-800">{booking.tenant.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email Address</p>
                    <p className="font-medium text-gray-800 break-all">{booking.tenant.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                    <FiPhone />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone Number</p>
                    <p className="font-medium text-gray-800">{booking.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA / Action */}
            <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]">
              Contact Tenant
            </button>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default BookingDetails;