import React from "react";
import { NavLink } from "react-router-dom";
import "./PhotoThumbnail.css";

export default function PhotoThumbnail({ id, galleryId, name, imageUrl }) {
  return (
    <div>
      {name}
      <img width="200px" height="200px" src={imageUrl} alt={name} />
      <NavLink to={`/gallery/${galleryId}/photos/${id}`}>
        <button>View photo</button>
      </NavLink>
    </div>
  );
}
