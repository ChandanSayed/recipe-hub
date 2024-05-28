import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    value: null,
    loading: true
  },
  reducers: {
    getUserData: (state, action) => {
      state.value = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { getUserData, setLoading } = userDataSlice.actions;

export default userDataSlice.reducer;
