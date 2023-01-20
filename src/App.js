import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { selectToken } from "./store/user/selectors";
// import { Navigate } from "react-router-dom";
import {
  Homepage,
  Login,
  SignUp,
  MyGalleries,
  PhotoMarket,
  GalleryDetails,
  PhotoDetails,
  ShoppingCart,
  MyProfile,
  UserDetails,
} from "./pages";

function App() {
  const dispatch = useDispatch();
  // const token = useSelector(selectToken);
  // if (!token) {
  //   <Navigate to="/" />;
  // }
  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

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
        <Route path="/gallery/:id/photo/:id" element={<PhotoDetails />} />
        <Route path="/mygallery" element={<MyGalleries />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
