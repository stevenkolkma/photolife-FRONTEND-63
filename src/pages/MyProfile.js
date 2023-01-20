import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";
import "./MyProfile.css";

export const MyProfile = () => {
  const myProfile = useSelector(selectUser);

  if (!myProfile) return <div>Loading...</div>;

  return (
    <div className="container-myProfile">
      <NavLink to={`/photomarket`}>View PhotoMarket</NavLink>
      <div>
        <h1 className="title">User details of {myProfile.name}</h1>
        <h2 className="subtitle">Avatar</h2>
        <div className="photo-container">
          <img
            src={myProfile.avatar}
            alt={myProfile.name}
            className="avatar-img"
          />
          <div className="user-meta-data">
            <p>Id: {myProfile.id}</p>
            <p>Name: {myProfile.name}</p>
            <p>Email: {myProfile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
