import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    value: null
  },
  reducers: {
    getUserData: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { getUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
