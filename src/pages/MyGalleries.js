import React from "react";
import { useSelector } from "react-redux";
import { GalleryThumbnail } from "../components/GalleryThumbnail";
import { GalleryUpload } from "../components/GalleryUpload";
import { selectMyGalleries, selectToken } from "../store/user/selectors";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export const MyGalleries = () => {
  const token = useSelector(selectToken);
  const myGalleries = useSelector(selectMyGalleries);
  const [showUploadGallery, setShowUploadGallery] = useState(false);

  if (!token) {
    return <Navigate to="/" />;
  }
  if (!myGalleries) return <div>Loading...</div>;
  console.log(myGalleries);

  return (
    <div>
      <button onClick={() => setShowUploadGallery(!showUploadGallery)}>
        {showUploadGallery ? "Close" : "Upload a gallery"}
      </button>
      {showUploadGallery && <GalleryUpload />}
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
    </div>
  );
};
