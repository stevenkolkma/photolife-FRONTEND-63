import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails } from "../store/user/selectors";
import { fetchUserDetails } from "../store/user/thunks";

export const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, [dispatch, id]);
  console.log(userDetails);
  if (!userDetails) return <div>Loading...</div>;

  return (
    <div className="container-userDetails">
      <NavLink to={`/photomarket`}>View PhotoMarket</NavLink>
      <h1 className="title">User details of {userDetails.name}</h1>
      <h2 className="subtitle">Avatar</h2>
      <div className="photo-container">
        <img
          src={userDetails.avatar}
          alt={userDetails.name}
          className="avatar-img"
        />
        <div className="user-meta-data">
          <p>Id: {userDetails.id}</p>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
        </div>
      </div>
    </div>
  );
};
