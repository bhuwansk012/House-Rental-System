import React from "react";
import { RxAvatar } from "react-icons/rx";

const ProfileSection = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      {/* Cover */}
      <div className="w-full h-70 bg-blue-500 rounded-t-lg"></div>

      {/* Profile Info */}
      <div className="flex flex-col items-center -mt-16">
        {data.image ? (
          <img
            src={data.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        ) : (
          <RxAvatar className="w-32 h-32 text-gray-400 bg-white rounded-full border-4 border-white" />
        )}

        <h2 className="text-2xl font-semibold mt-4">{data.name}</h2>
        <p className="text-gray-500">{data.email}</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mt-8 px-8">
        <div>
          <p className="text-gray-600">Age</p>
          <p className="font-medium">{data.age || "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-600">Phone</p>
          <p className="font-medium">{data.phone || "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-600">Address</p>
          <p className="font-medium">{data.address || "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-600">Date of Birth</p>
          <p className="font-medium">{data.dateOfBirth || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;