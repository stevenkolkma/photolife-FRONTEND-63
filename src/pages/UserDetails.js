import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Photo from "../components/Photo";
import { fetchPhotoDetails } from "../store/gallery/thunks";
import { selectPhotoDetails } from "../store/gallery/selectors";

export const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const photoDetails = useSelector(selectPhotoDetails);
  console.log(photoDetails);
  useEffect(() => {
    dispatch(fetchPhotoDetails(id));
  }, [dispatch, id]);

  if (!photoDetails) return <div>Loading...</div>;

  return (
    <div className="container-userdetailspage">
      <Link to={`/gallery/${photoDetails.galleryId}`}>View Gallery</Link>
      <h1>Photo details of {photoDetails.name}</h1>
      <h2>The picture</h2>
      <Photo
        name={photoDetails.name}
        imageUrl={photoDetails.imageUrl}
        caption={photoDetails.caption}
        metaData={photoDetails.metaData}
        galleryId={photoDetails.galleryId}
        userId={photoDetails.userId}
      />
    </div>
  );
};
