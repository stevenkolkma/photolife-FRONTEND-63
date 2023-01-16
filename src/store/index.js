import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import galleryReducer from "./gallery/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    gallery: galleryReducer,
  },
});
