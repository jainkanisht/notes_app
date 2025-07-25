import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-10 space-y-8 transition-all duration-300">
        
        <h1 className="text-3xl font-extrabold text-blue-700 text-center drop-shadow-md">
          {pasteId ? "✏️ Update Your Paste" : "📝 Create a New Paste"}
        </h1>

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter paste title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
          />

          <button
            onClick={createPaste}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl shadow-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>
        </div>

        {/* Textarea */}
        <div>
          <textarea
            placeholder="Enter your paste content here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full min-h-[180px] p-4 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 resize-y"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
