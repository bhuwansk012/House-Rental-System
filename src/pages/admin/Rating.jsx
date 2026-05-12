import React, { useState, useEffect } from "react";
import {
  Star,
  MessageSquare,
  User,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { getAllRate } from "../../service/ratingService";

const Rating = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    try {
      const response = await getAllRate();
      setRatings(response || []);
      console.log("Fetched Ratings:", response);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const renderStars = (count) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={18}
        className={
          index < count
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            System Ratings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            User feedback and ratings overview
          </p>
        </div>

        <div className="bg-indigo-100 p-3 rounded-xl">
          <ShieldCheck className="text-indigo-600" size={28} />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 mt-10">
          Loading ratings...
        </div>
      )}

      {/* Empty State */}
      {!loading && ratings.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <MessageSquare size={50} className="mx-auto text-gray-300 mb-3" />
          <h2 className="text-xl font-semibold text-gray-700">
            No Ratings Found
          </h2>
          <p className="text-gray-500 mt-2">
            Users have not submitted feedback yet.
          </p>
        </div>
      )}

      {/* FULL WIDTH LIST (NOT GRID) */}
      <div className="flex flex-col gap-5">

        {ratings.map((rating) => (
          <div
            key={rating.id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all w-full"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* LEFT SIDE */}
              <div className="flex-1">

                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">

                  <div className="bg-indigo-100 p-4 rounded-full">
                    <User className="text-indigo-600" size={24} />
                  </div>

                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {rating.rateBy}
                    </h2>

                    <p className="text-sm text-gray-500">
                      User ID: {rating.userId}
                    </p>
                  </div>

                  <div
                    className={`ml-auto text-xs px-3 py-1 rounded-full font-semibold ${
                      rating.rated
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {rating.rated ? "Rated" : "Pending"}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(rating.rate)}

                  <span className="ml-2 text-sm font-medium text-gray-600">
                    ({rating.rate}/5)
                  </span>
                </div>

                {/* Feedback */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {rating.feedback || "No feedback provided"}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="lg:w-52 flex lg:flex-col items-center justify-between gap-4 border-t lg:border-t-0 lg:border-l border-gray-200 pt-4 lg:pt-0 lg:pl-6">

                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Rating ID</p>
                  <h2 className="font-bold text-indigo-600">
                    #{rating.id}
                  </h2>
                </div>

                <div className="text-center">
                  <CalendarDays
                    size={20}
                    className="mx-auto text-gray-400 mb-1"
                  />
                  <p className="text-xs text-gray-400">
                    Submitted
                  </p>
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Rating;