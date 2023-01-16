import React from "react";
import { NavLink } from "react-router-dom";

export default function UserThumbnail({ id, name, address, imageUrl, email }) {
  return (
    <div>
      <h1>Name: {name}</h1>
      <p>Email: {email}</p>
      <p>Address: {address}</p>
      <img height="200px" width="200px" src={imageUrl} alt={name} />
      <NavLink to={`users/${id}`}>
        <button>View user</button>
      </NavLink>
    </div>
  );
}
