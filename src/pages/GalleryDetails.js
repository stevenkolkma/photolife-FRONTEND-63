import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhotoThumbnail from "../components/PhotoThumbnail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleryDetails } from "../store/gallery/selectors";
import { PhotoUpload } from "../components/PhotoUpload";
import { fetchGalleryDetails } from "../store/gallery/thunks";
import { selectToken, selectUser } from "../store/user/selectors";
import "./GalleryDetails.css";

export const GalleryDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector(selectToken);
  const galleryDetails = useSelector(selectGalleryDetails);
  const user = useSelector(selectUser);
  const [state, setState] = useState();
  console.log(galleryDetails, state);
  const updateFromChild = () => {
    setState();
  };
  useEffect(() => {
    dispatch(fetchGalleryDetails(id));
  }, [dispatch, id]);

  if (!galleryDetails) return <div>Loading...</div>;

  return (
    <div className="container-gallerydetailspage">
      <div className="header-section">
        <Link to="/photomarket">
          <button>View the photomarket</button>
        </Link>
        <h1>Gallery details of {galleryDetails.name}</h1>
      </div>
      <div className="photos-section">
        <h2>Photos</h2>
        {galleryDetails.photos ? (
          <div className="photos-grid">
            {galleryDetails.photos.map((photo, index) => {
              return (
                <div className="photo-thumbnail" key={index}>
                  <img src={photo.imageUrl} alt={photo.name} />
                  <div className="caption">{photo.caption}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Photos found</div>
        )}
      </div>
      <div className="upload-section">
        {token && user && user.id === galleryDetails.userId ? (
          <PhotoUpload
            updateFromChild={updateFromChild}
            galleryId={galleryDetails.id}
          />
        ) : null}
      </div>
    </div>
  );
};