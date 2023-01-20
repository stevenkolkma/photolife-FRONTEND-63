import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GalleryThumbnail } from "../components/GalleryThumbnail";
import { PhotoThumbnail } from "../components/PhotoThumbnail";
import { fetchAllGalleries } from "../store/gallery/thunks";
import { fetchAllUsers } from "../store/user/thunks";
import { selectAllGalleries } from "../store/gallery/selectors";
import { selectAllUsers } from "../store/user/selectors";
import UserThumbnail from "../components/UserThumbnail";
import "./PhotoMarket.css";

export const PhotoMarket = () => {
  const dispatch = useDispatch();
  const galleries = useSelector(selectAllGalleries);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const allUsers = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchAllGalleries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredPhotos = galleries
    .map((g) => g.photos)
    .flat()
    .filter((photo) =>
      photo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const filteredGalleries = galleries.filter(
    (gallery) =>
      gallery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gallery.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!galleries) return <div>Loading...</div>;
  return (
    <div className="photomarket-container">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="search-select"
        >
          <option value="all">Search all</option>
          <option value="photos">Photos</option>
          <option value="galleries">Galleries</option>
          <option value="users">Users</option>
        </select>
      </div>
      <div className="results-container">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <h2>Photos</h2>
          {searchBy === "all" &&
            filteredPhotos.map((photo, index) => (
              <div key={index} className="photo-thumbnail">
                <PhotoThumbnail
                  key={index}
                  id={photo.id}
                  name={photo.name}
                  publicId={photo.publicId}
                  imageUrl={photo.imageUrl}
                  galleryId={photo.galleryId}
                />
              </div>
            ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <h2>Galleries</h2>
          {searchBy === "all" &&
            filteredGalleries.map((gallery, index) => (
              <div key={index} className="gallery-thumbnail">
                <GalleryThumbnail
                  key={index}
                  id={gallery.id}
                  name={gallery.name}
                  imageUrl={gallery.thumbnail}
                  caption={gallery.caption}
                  userId={gallery.userId}
                />
              </div>
            ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <h2>Users</h2>
          {searchBy === "all" &&
            filteredUsers.map((user, index) => (
              <div key={index} className="user-thumbnail">
                <UserThumbnail
                  key={index}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  avatar={user.avatar}
                />
              </div>
            ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {searchBy === "photos" &&
            filteredPhotos.map((photo, index) => (
              <div key={index} className="photo-thumbnail">
                <PhotoThumbnail
                  key={index}
                  id={photo.id}
                  name={photo.name}
                  publicId={photo.publicId}
                  imageUrl={photo.imageUrl}
                  galleryId={photo.galleryId}
                />
              </div>
            ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {searchBy === "galleries" &&
            filteredGalleries.map((gallery, index) => (
              <div key={index} className="gallery-thumbnail">
                <GalleryThumbnail
                  key={index}
                  id={gallery.id}
                  name={gallery.name}
                  imageUrl={gallery.thumbnail}
                  caption={gallery.caption}
                  userId={gallery.userId}
                />
              </div>
            ))}
        </div>
        <div>
          {searchBy === "users" &&
            filteredUsers.map((user, index) => (
              <div key={index} className="user-thumbnail">
                <UserThumbnail
                  key={index}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  avatar={user.avatar}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
