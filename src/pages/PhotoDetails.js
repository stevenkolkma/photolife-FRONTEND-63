import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotoDetails } from "../store/gallery/thunks";
import { selectPhotoDetails } from "../store/gallery/selectors";
import { addToCart, removeFromCart } from "../store/cart/slice";
export const PhotoDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const photoDetails = useSelector(selectPhotoDetails);

  useEffect(() => {
    dispatch(fetchPhotoDetails(id));
  }, [dispatch, id]);

  if (!photoDetails) return <div>Loading...</div>;

  const handleAddToCart = () => {
    dispatch(addToCart(photoDetails));
  };
  const handleRemoveToCart = () => {
    dispatch(removeFromCart(photoDetails));
  };

  return (
    <div className="container-photodetailspage">
      <Link to={`/gallery/${photoDetails.galleryId}`}>View Gallery</Link>
      <h1 className="title">Photo details of {photoDetails.name}</h1>
      <h2 className="subtitle">The picture</h2>
      <div className="photo-container">
        <img
          src={photoDetails.imageUrl}
          alt={photoDetails.name}
          className="photo-img"
        />
        <div className="photo-meta-data">
          <p>Caption: {photoDetails.caption}</p>
          <p>MetaData: {photoDetails.metaData}</p>
          <p>Public id: {photoDetails.publicId}</p>
          <p>Gallery id: {photoDetails.galleryId}</p>
          <p>User id: {photoDetails.userId}</p>
        </div>
      </div>
      <div className="add-to-cart-container">
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
        <button onClick={handleRemoveToCart} className="remove-to-cart-button">
          Remove to Cart
        </button>
      </div>
    </div>
  );
};
