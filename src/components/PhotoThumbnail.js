import React from "react";
import { NavLink } from "react-router-dom";
import "./PhotoThumbnail.css";

export const PhotoThumbnail = ({ id, galleryId, name, imageUrl }) => {
  return (
    <div>
      <img width="200px" height="200px" src={imageUrl} alt={name} />
      <p>{name}</p>
      <NavLink to={`/gallery/${galleryId}/photo/${id}`}>
        <button>View photo</button>
      </NavLink>
    </div>
  );
};
