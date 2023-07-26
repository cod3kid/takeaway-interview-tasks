import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state = action.payload;
    },
    removeUserData: (state) => {
      state = null;
    },
  },
});

export const { addUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
