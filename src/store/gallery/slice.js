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

export const { setAllGalleries, setGalleryDetails, setPhotoDetails } =
  gallerySlice.actions;

export default gallerySlice.reducer;
