import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalRequests: 0,
};

const verificationSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTotalRequests: (state, action) => {
      state.totalRequests = action.payload;
    },
  },
});

export const { setTotalRequests } = verificationSlice.actions;

export default verificationSlice.reducer;
