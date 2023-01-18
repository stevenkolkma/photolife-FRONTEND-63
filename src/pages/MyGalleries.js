import React from "react";
import { useSelector } from "react-redux";
import GalleryThumbnail from "../components/GalleryThumbnail";
import { GalleryUpload } from "../components/GalleryUpload";

export const MyGalleries = () => {
  const myGalleries = useSelector(selectMyGalleries);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {myGalleries.map((gallery, index) => (
        <div>
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
      <GalleryUpload />
    </div>
  );
};
