import React, { useEffect, useState } from "react";
import { getAllNotifications, markAsRead } from "../../service/notificationService";
import { motion } from "framer-motion";
import { FiBell, FiCheckCircle } from "react-icons/fi";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [activeId,setActiveId]=useState(null);
  const fetchNotifications = async () => {
    try {
      const res = await getAllNotifications();
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Error fetching notifications", err);
    }
  };

  const handleMarkAsRead = async (id, isRead) => {
    try {
      setIsClicked(true);
      setActiveId(id);
      if (!isRead) {
        await markAsRead(id);
        fetchNotifications();
      }
    } catch (err) {
      console.error("Error marking notification as read", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-300 mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FiBell /> Notifications
        </h1>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications found.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleMarkAsRead(notification.id, notification.read)}
                className={`p-2 rounded-2xl shadow-sm cursor-pointer border transition-all ${
                  notification.read
                    ? "bg-white border-gray-200"
                    : "bg-gray-100 font-bold text-blue-600 border-gray-300"
                }`}
              >{isClicked && activeId === notification.id ?
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {notification.title}
                    </h2>
                    <p className="text-gray-600 mt-2 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>

                  {notification.read && (
                    <FiCheckCircle className="text-green-500 text-xl" />
                  )}
                </div>:<div>{notification.title}</div>}

                <div className="mt-3 text-sm text-gray-400">
                  {formatDate(notification.createdAt)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
