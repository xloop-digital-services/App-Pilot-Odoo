import React from 'react';

const LimitReachedModal = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed background */}
      <div className="fixed inset-0 bg-black bg-opacity-70"></div>

      {/* Modal content */}
      <div className="relative bg-[#a9d7ff] rounded-lg shadow-lg p-6 max-w-md w-full z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#1572c2] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#0d5b99] w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LimitReachedModal;
