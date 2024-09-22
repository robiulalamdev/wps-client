import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setRForm1, setRForm2, setPrfId } = usersSlice.actions;

export default usersSlice.reducer;
