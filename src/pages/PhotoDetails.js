import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotoDetails } from "../store/gallery/thunks";
import { selectPhotoDetails } from "../store/gallery/selectors";
import { addToCart } from "../store/cart/slice";
import { deletePhoto } from "../store/user/thunks";
import { EditPhotoForm } from "../components/EditPhotoForm";
import { selectToken, selectUser } from "../store/user/selectors";
import "./PhotoDetails.css";

export const PhotoDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const photoDetails = useSelector(selectPhotoDetails);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [showEditPhoto, setShowEditPhoto] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(() => {
    dispatch(fetchPhotoDetails(id));
  }, [dispatch, id]);

  if (!photoDetails) return <div>Loading...</div>;

  const handleAddToCart = () => {
    dispatch(addToCart(photoDetails));
  };
  return (
    <div>
      <div>
        <Link to={`/gallery/${photoDetails.galleryId}`}>
          <button>View Gallery</button>
        </Link>
      </div>
      <div className="container-photodetailspage">
        <div>
          {token && user && user.id === photoDetails.userId ? (
            <span>
              <button onClick={() => setShowEditPhoto(!showEditPhoto)}>
                {showEditPhoto ? "Close" : "Edit my photo"}
              </button>
              <button
                onClick={() => {
                  dispatch(deletePhoto(photoDetails.id));
                  navigate(`/gallery/${photoDetails.galleryId}`);
                  refreshPage();
                }}
              >
                Delete Photo
              </button>
            </span>
          ) : null}
          {showEditPhoto && <EditPhotoForm />}
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
              <p>Price: {photoDetails.price}</p>
              {token && (
                <div className="add-to-cart-container">
                  <button
                    onClick={handleAddToCart}
                    className="add-to-cart-button"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
