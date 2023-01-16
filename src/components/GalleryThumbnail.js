import { NavLink } from "react-router-dom";

export default function GalleryThumbnail({
  id,
  name,
  imageUrl,
  description,
  userId,
}) {
  return (
    <div>
      <h1>Name: {name}</h1>
      <img width="150px" height="150px" src={imageUrl} alt={name} />
      <p>Description: {description}</p>
      <p>Gallery id: {id}</p>
      <p>User id: {userId}</p>
      <NavLink to={`/gallery/${id}`}>
        <button>View Gallery</button>
      </NavLink>
    </div>
  );
}
