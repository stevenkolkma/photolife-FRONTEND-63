import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMyGalleries } from "../store/user/selectors";
import GalleryThumbnail from "../components/GalleryThumbnail";
import { GalleryUpload } from "../components/GalleryUpload";

export const MyGalleries = () => {
  const dispatch = useDispatch();
  const myGalleries = useSelector(selectMyGalleries);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {myGalleries.map((gallery, index) => (
        <GalleryThumbnail
          key={index}
          id={gallery.id}
          name={gallery.name}
          imageUrl={gallery.thumbnail}
          caption={gallery.caption}
          userId={gallery.userId}
        />
      ))}
      <GalleryUpload />
    </div>
  );
};
