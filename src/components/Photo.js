import React from "react";
import { Link } from "react-router-dom";
export default function Photo({
  name,
  imageUrl,
  caption,
  metaData,
  publicId,
  galleryId,
  userId,
}) {
  return (
    <div>
      <h1>Name: {name}</h1>
      <img src={imageUrl} alt={name} />
      <p>Caption: {caption}</p>
      <p>MetaData: {metaData}</p>
      <p>Public id: {publicId}</p>
      <p>Gallery id: {galleryId}</p>
      <p>User id: {userId}</p>
    </div>
  );
}
