import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PhotoThumbnail } from "../components/PhotoThumbnail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleryDetails } from "../store/gallery/selectors";
import { PhotoUpload } from "../components/PhotoUpload";
import { fetchGalleryDetails } from "../store/gallery/thunks";
import { deleteGallery } from "../store/user/thunks";
import { useNavigate } from "react-router-dom";
import { selectToken, selectUser } from "../store/user/selectors";
import { EditGalleryForm } from "../components/EditGalleryForm";
import "./GalleryDetails.css";

export const GalleryDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const galleryDetails = useSelector(selectGalleryDetails);
  const user = useSelector(selectUser);
  const [showEditGallery, setShowEditGallery] = useState(false);
  const [showPostPhoto, setShowPostPhoto] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

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
        {token && (
          <Link to="/mygallery">
            <button>View my galleries</button>
          </Link>
        )}
        {token && user && user.id === galleryDetails.userId ? (
          <span>
            <button onClick={() => setShowEditGallery(!showEditGallery)}>
              {showEditGallery ? "Close" : "Edit my gallery"}
            </button>
            <button
              onClick={() => {
                dispatch(deleteGallery(galleryDetails.id));
                navigate(`/mygallery/`);
                // refreshPage();
              }}
            >
              Delete Gallery
            </button>
            <button onClick={() => setShowPostPhoto(!showPostPhoto)}>
              {showPostPhoto ? "Close" : "Upload"}
            </button>
            {showPostPhoto && <PhotoUpload galleryId={galleryDetails.id} />}
          </span>
        ) : null}
        <h1>Gallery details of {galleryDetails.name}</h1>
        <img style={{ height: "150px" }} src={galleryDetails.thumbnail}></img>
        {showEditGallery && <EditGalleryForm />}
      </div>
      <h2>Photos</h2>
      <div className="photos-section">
        {galleryDetails.photos ? (
          <div style={{ display: "flex" }}>
            {galleryDetails.photos.map((photo, index) => {
              return (
                <div key={index} className="photo-thumbnail">
                  <PhotoThumbnail
                    key={index}
                    id={photo.id}
                    name={photo.name}
                    publicId={photo.publicId}
                    imageUrl={photo.imageUrl}
                    galleryId={photo.galleryId}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Photos found</div>
        )}
      </div>
    </div>
  );
};
