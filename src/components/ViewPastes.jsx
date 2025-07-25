import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPastes = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-600 text-lg font-semibold">
          ❌ Paste not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 border-b pb-2">
          📄 {paste.title}
        </h1>

        <div className="text-gray-800 whitespace-pre-wrap break-words text-base leading-relaxed">
          {paste.content}
        </div>

        <div className="text-right text-sm text-gray-500 mt-6">
          🕒 Created on:{" "}
          {new Date(paste.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ViewPastes;
