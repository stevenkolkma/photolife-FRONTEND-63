import React from "react";
import { NavLink } from "react-router-dom";
import "./UserThumbnail.css";

export default function UserThumbnail({ id, name, avatar, email }) {
  return (
    <div>
      <h1>Name: {name}</h1>
      <p>Email: {email}</p>
      <img height="200px" width="200px" src={avatar} alt={name} />
      <NavLink to={`/users/${id}`}>
        <button>View user</button>
      </NavLink>
    </div>
  );
}
