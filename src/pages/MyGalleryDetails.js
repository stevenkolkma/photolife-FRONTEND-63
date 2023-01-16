import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMyGalleries } from "../store/user/selectors";
import PhotoThumbnail from "../components/PhotoThumbnail";

export const MyGalleryDetails = () => {
  const dispatch = useDispatch();
  const myGalleries = useSelector(selectMyGalleries);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {myGalleries.map((gallery, index) => (
        <PhotoThumbnail
          key={index}
          id={gallery.id}
          name={gallery.name}
          imageUrl={gallery.thumbnail}
          caption={gallery.caption}
          userId={gallery.userId}
        />
      ))}
    </div>
  );
};
