import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste created successfully");
      } 
    },
    resetToPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes"); // ✅ only clears pastes
      toast.success("All pastes have been reset");
    },
    removeFromPastes: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter((paste) => paste._id !== id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste removed successfully");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetToPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
