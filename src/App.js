import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { selectToken } from "./store/user/selectors";
import {
  Homepage,
  Login,
  SignUp,
  MyGalleries,
  PhotoMarket,
  GalleryDetails,
  MyGalleryDetails,
  PhotoDetails,
  ShoppingCart,
  MyProfile,
  UserDetails,
} from "./pages";
import { PhotoUpload } from "./components/PhotoUpload";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  // if (!token) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/photomarket" element={<PhotoMarket />} />
        <Route path="/gallery/:id" element={<GalleryDetails />} />
        <Route path="/gallery/:id/photos/:id" element={<PhotoDetails />} />
        <Route path="/mygallery" element={<MyGalleries />} />
        <Route path="/mygallery/:id/photo" element={<MyGalleryDetails />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/upload" element={<PhotoUpload />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
