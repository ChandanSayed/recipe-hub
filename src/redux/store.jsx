import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./features/user/userSlice";

export default configureStore({
  reducer: {
    userData: userDataReducer
  }
});
