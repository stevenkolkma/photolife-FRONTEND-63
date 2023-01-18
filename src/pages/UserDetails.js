import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Photo from "../components/Photo";
import {selectAllGalleries} from "../store/gallery/selectors";

export const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allGalleries = useSelector(selectAllGalleries);

  if (!photoDetails) return <div>Loading...</div>;

  return (
    <div className="container-userdetailspage">

      <h1>User details of {allGalleries.name}</h1>

    </div>
  );
};
