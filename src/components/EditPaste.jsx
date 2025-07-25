import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const EditPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setContent(paste.content);
    }
  }, [paste]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!title || !content) return toast.error("Fields cannot be empty");

    dispatch(updateToPastes({ ...paste, title, content }));
    toast.success("Paste updated ✅");
    navigate("/pastes");
  };

  if (!paste) {
    return <div className="text-center mt-10 text-red-600">Paste not found</div>;
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-md mx-auto mt-10 space-y-4 p-4 border rounded"
    >
      <h2 className="text-xl font-semibold">Edit Paste</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-3 py-2 border rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full px-3 py-2 border rounded"
        rows={6}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Paste
      </button>
    </form>
  );
};

export default EditPaste;
