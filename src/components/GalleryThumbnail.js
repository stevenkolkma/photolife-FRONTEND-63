import { NavLink } from "react-router-dom";
import "./GalleryThumbnail.css";

export const GalleryThumbnail = ({ id, name, imageUrl }) => {
  return (
    <div>
      <img
        style={{ margin: "0", padding: "0", objectFit: "cover" }}
        width="100px"
        height="100px"
        src={imageUrl}
        alt={name}
      />
      <p>Name: {name}</p>
      <NavLink to={`/gallery/${id}`}>
        <button>View Gallery</button>
      </NavLink>
    </div>
  );
};
