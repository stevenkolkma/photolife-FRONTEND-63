import { apiUrl } from "../../config/constants";
import axios from "axios";
import { setAllGalleries, setGalleryDetails, setPhotoDetails } from "./slice";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";

//GET request for all galleries
export const fetchAllGalleries = () => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/galleries`);
    console.log("Response from fetchAllGalleries thunk", response.data);
    dispatch(setAllGalleries(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

//GET request for gallery by ID
export const fetchGalleryDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/galleries/${id}`);
    console.log("Response from fetchGalleryById thunk", response.data);
    dispatch(setGalleryDetails(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};

//GET request for gallery by ID
export const fetchPhotoDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/photos/${id}`);
    console.log("Response from fetchPhotoById thunk", response.data);
    dispatch(setPhotoDetails(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
};
