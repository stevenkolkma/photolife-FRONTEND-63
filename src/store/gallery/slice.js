import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  galleries: [],
  galleryDetails: [],
  photoDetails: [],
};

export const gallerySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllGalleries: (state, action) => {
      state.galleries = action.payload;
    },
    setGalleryDetails: (state, action) => {
      state.galleryDetails = action.payload;
    },
    setPhotoDetails: (state, action) => {
      state.photoDetails = action.payload;
    },
    postNewPhotoAction: (state, action) => {
      // const newPhoto = {
      //   ...state.galleryDetails,
      //   photos: [...state.galleryDetails.photos, action.payload],
      // };
      // return newPhoto;
      state.galleryDetails = [...state.galleryDetails.photos, action.payload];
    },
    updatePhotoAction: (state, action) => {
      if (state.galleryDetails.id === action.payload.galleryId) {
        return {
          ...state.galleryDetails,
          photos: state.galleryDetails.photos.map((photo) => {
            if (photo.id === action.payload.photo.id) {
              return action.payload.photo;
            }
            return photo;
          }),
        };
      }
    },
    deletePhotoAction: (state, action) => {
      return {
        ...state.galleryDetails,
        photos: state.galleryDetails.photos.filter(
          (photo) => photo.id !== action.payload.photoId
        ),
      };
    },
  },
});

export const {
  setAllGalleries,
  setGalleryDetails,
  setPhotoDetails,
  postNewPhotoAction,
  updatePhotoAction,
  deletePhotoAction,
} = gallerySlice.actions;

export default gallerySlice.reducer;
