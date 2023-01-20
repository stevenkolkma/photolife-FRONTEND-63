import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  myGalleries: [],
  allUsers: [],
  userDetails: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.myGalleries = action.payload.myGalleries;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
      state.myGalleries = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
      state.myGalleries = action.payload.myGalleries;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    postNewGalleryAction: (state, action) => {
      state.myGalleries = [...state.myGalleries, action.payload];
    },
    updateGalleryAction: (state, action) => {
      state.myGalleries = state.myGalleries.map((gallery) => {
        if (gallery.id === action.payload.id) {
          return action.payload;
        }
        return gallery;
      });
    },
    deleteGalleryAction: (state, action) => {
      state.myGalleries = state.myGalleries.filter(
        (gallery) => gallery.id !== action.payload
      );
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  setAllUsers,
  setUserDetails,
  postNewGalleryAction,
  updateGalleryAction,
  deleteGalleryAction,
} = userSlice.actions;

export default userSlice.reducer;
