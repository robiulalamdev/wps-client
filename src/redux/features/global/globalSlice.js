import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  visitors: [],
  users: [],
  totalUsers: 0,
  totalVisitors: 0,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setVisitors: (state, action) => {
      state.visitors = action.payload.visitors;
      state.totalVisitors = action.payload.total;
      state.totalUsers = action.payload.totalUsers;
      state.users = action.payload.users;
    },
  },
});

export const { setIsOpen, setVisitors, setUsers } = globalSlice.actions;

export default globalSlice.reducer;
