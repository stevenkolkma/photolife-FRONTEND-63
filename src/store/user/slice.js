import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  myGalleries: [],
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
    postNewGalleryAction: (state, action) => {
      state.myGalleries = [...state.myGalleries, action.payload];
    },
    updateGalleryAction: (state, action) => {
      const updatedGalleries = state.myGalleries.map((gallery) => {
        if (gallery.id === action.payload.id) {
          return action.payload;
        }
        return gallery;
      });
      state.myGalleries = updatedGalleries;
    },
    deleteGalleryAction: (state, action) => {
      state.myGalleries = state.myGalleries.filter(
        (gallery) => gallery.id !== action.payload
      );
    },
    postNewPhotoAction: (state, action) => {
      const updatedGallery = state.myGalleries.map((gallery) => {
        if (gallery.id === action.payload.galleryId) {
          return {
            ...gallery,
            photos: [...gallery.photos, action.payload.photo],
          };
        }
        return gallery;
      });
      state.myGalleries = updatedGallery;
    },
    updatePhotoAction: (state, action) => {
      const updatedGallery = state.myGalleries.map((gallery) => {
        if (gallery.id === action.payload.galleryId) {
          return {
            ...gallery,
            photos: gallery.photos.map((photo) => {
              if (photo.id === action.payload.photo.id) {
                return action.payload.photo;
              }
              return photo;
            }),
          };
        }
        return gallery;
      });
      state.myGalleries = updatedGallery;
    },
    deletePhotoAction: (state, action) => {
      const updatedGallery = state.myGalleries.map((gallery) => {
        if (gallery.id === action.payload.galleryId) {
          return {
            ...gallery,
            photos: gallery.photos.filter(
              (photo) => photo.id !== action.payload.photoId
            ),
          };
        }
        return gallery;
      });
      state.myGalleries = updatedGallery;
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  postNewGalleryAction,
  postNewPhotoAction,
  updateGalleryAction,
  updatePhotoAction,
  deleteGalleryAction,
  deletePhotoAction,
} = userSlice.actions;

export default userSlice.reducer;
