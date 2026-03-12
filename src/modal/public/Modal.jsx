import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      <div className="bg-white rounded-lg w-[900px] max-h-[90vh] overflow-y-auto p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black text-xl hover:text-red-500 transition bg-white p-1 rounded-full shadow"
        >
          <AiOutlineClose />
        </button>

        {children}

      </div>

    </div>
  );
};

export default Modal;