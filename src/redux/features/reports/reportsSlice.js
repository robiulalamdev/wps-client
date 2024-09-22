import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalReports: 0,
};

const reportsSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTotalReports: (state, action) => {
      state.totalReports = action.payload;
    },
  },
});

export const { setTotalReports } = reportsSlice.actions;

export default reportsSlice.reducer;
