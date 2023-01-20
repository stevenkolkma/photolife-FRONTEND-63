import React from "react";
import { useSelector } from "react-redux";
import { GalleryThumbnail } from "../components/GalleryThumbnail";
import { GalleryUpload } from "../components/GalleryUpload";
import { selectMyGalleries, selectToken } from "../store/user/selectors";
import { Navigate } from "react-router-dom";

export const MyGalleries = () => {
  // const navigate = useNavigate();
  const token = useSelector(selectToken);
  const myGalleries = useSelector(selectMyGalleries);

  if (!token) {
    return <Navigate to="/" />;
  }
  if (!myGalleries) return <div>Loading...</div>;

  return (
    <div>
      <h1>My galleries</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {myGalleries.map((gallery, index) => (
          <div key={index} className="gallery-thumbnail">
            <GalleryThumbnail
              key={index}
              id={gallery.id}
              name={gallery.name}
              imageUrl={gallery.thumbnail}
              caption={gallery.caption}
              userId={gallery.userId}
            />
          </div>
        ))}
      </div>
      <br />
      <br />
      <GalleryUpload />
    </div>
  );
};
