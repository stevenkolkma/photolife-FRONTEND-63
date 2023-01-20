import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import {
  loginSuccess,
  logOut,
  tokenStillValid,
  setAllUsers,
  setUserDetails,
  postNewGalleryAction,
  updateGalleryAction,
  deleteGalleryAction,
} from "./slice";
import {
  deletePhotoAction,
  postNewPhotoAction,
  updatePhotoAction,
} from "../gallery/slice";
import { fetchGalleryDetails } from "../gallery/thunks";

//GET all users
export const fetchAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/users/`);
    console.log("Response from fetchAllUsers thunk", response.data);
    dispatch(setAllUsers(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

//GET request for user by ID
export const fetchUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/users/${id}`);
    console.log("Response from fetchUserDetails thunk", response.data);
    dispatch(setUserDetails(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

export const postNewPhoto = (photoData) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      // console.log(name, content, imageUrl);
      dispatch(appLoading());
      const {
        name,
        caption,
        metaData,
        price,
        imageUrl,
        publicId,
        galleryId,
        userId,
      } = photoData;
      console.log(galleryId);
      const response = await axios.post(
        `${apiUrl}/photos/`,
        {
          name,
          caption,
          metaData,
          price,
          imageUrl,
          publicId,
          galleryId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response postNewPhoto", response);
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(fetchGalleryDetails(galleryId));
      // dispatch(postNewPhotoAction(response.data));
      // dispatch(getUserWithStoredToken());
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const editPhoto = (id, name, caption, metaData, price) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.put(
        `${apiUrl}/photos/${id}`,
        {
          name,
          caption,
          metaData,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      dispatch(
        showMessageWithTimeout("success", false, "update successfull", 3000)
      );
      dispatch(updatePhotoAction(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

// Feature 4: Delete a photo
export const deletePhoto = (photoId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const { token } = getState().user;
    // console.log("Delete thunk - mySpace: ", mySpace);
    // console.log("Delete thunk - token: ", token);

    try {
      const response = await axios.delete(`${apiUrl}/photos/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Photo deleted?", response.data);
      dispatch(deletePhotoAction(photoId));
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e);
    }
  };
};
export const postNewGallery = (galleryData) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());
      console.log(galleryData);
      const { name, description, date, thumbnail, userId } = galleryData;
      const response = await axios.post(
        `${apiUrl}/galleries/`,
        {
          name,
          description,
          date,
          thumbnail,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      console.log("Response postNewGallery", response);
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(postNewGalleryAction(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const editGallery = (id, name, description, date, thumbnail) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.put(
        `${apiUrl}/galleries/${id}`,
        {
          name,
          description,
          date,
          thumbnail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      dispatch(
        showMessageWithTimeout("success", false, "update successfull", 3000)
      );
      dispatch(updateGalleryAction(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const deleteGallery = (galleryId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const { token } = getState().user;
    // console.log("Delete thunk - mySpace: ", mySpace);
    // console.log("Delete thunk - token: ", token);
    console.log(galleryId);
    try {
      const response = await axios.delete(`${apiUrl}/galleries/${galleryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Gallery deleted?", response.data);
      dispatch(deleteGalleryAction(galleryId));
      dispatch(appDoneLoading());
    } catch (e) {
      console.error(e);
    }
  };
};

export const makeNewOrder = (id, address, totalPrice, cartItems) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      // console.log(name, content, imageUrl);
      dispatch(appLoading());
      const response = await axios.post(
        `${apiUrl}/order/`,
        {
          userId: id,
          totalPrice,
          address,
          cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response postNewPhoto", response);
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );

      dispatch(postNewPhotoAction(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.user,
          myGalleries: response.data.myGalleries,
        })
      );
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({
          token: response.data.token,
          user: response.data.user,
          myGalleries: response.data.myGalleries,
        })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);

      // token is still valid
      dispatch(
        tokenStillValid({
          user: response.data,
          myGalleries: response.data.myGalleries,
        })
      );
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
