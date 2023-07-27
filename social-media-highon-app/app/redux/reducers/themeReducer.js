import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const themeSlice = createSlice({
  name: "theme",
  initialState,
});
export default themeSlice.reducer;
