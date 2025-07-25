import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleCopy(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard! ✅");
      })
      .catch((err) => {
        toast.error("Failed to copy ❌");
      });
  }

  function handleShare(paste) {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Shared successfully ✅"))
        .catch(() => toast.error("Failed to share ❌"));
    } else {
      toast.error("Sharing not supported on this browser");
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 flex flex-col items-center">
      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 transition-all"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {filteredData.map((paste) => (
          <div
            key={paste._id}
            className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-2 truncate">
              {paste.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 break-words line-clamp-3">
              {paste.content}
            </p>
            <p className="text-gray-400 text-xs mb-4">
              Created: {new Date(paste.createdAt).toLocaleString()}
            </p>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => navigate(`/pastes/edit/${paste._id}`)}
                className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-full cursor-pointer"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => navigate(`/pastes/${paste._id}`)}
                className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer"
              >
                👁️ View
              </button>
              <button
                onClick={() => handleCopy(paste.content)}
                className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-full cursor-pointer"
              >
                📋 Copy
              </button>
              <button
                onClick={() => handleDelete(paste._id)}
                className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer"
              >
                🗑️ Delete
              </button>
              <button
                onClick={() => handleShare(paste)}
                className="px-3 py-1 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-full cursor-pointer"
              >
                📤 Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pastes;
