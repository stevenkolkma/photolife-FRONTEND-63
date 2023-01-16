import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import GalleryThumbnail from "../components/GalleryThumbnail";
import PhotoThumbnail from "../components/PhotoThumbnail";
import { fetchAllGalleries } from "../store/gallery/thunks";
import { selectAllGalleries } from "../store/gallery/selectors";
import UserThumbnail from "../components/UserThumbnail";
import "./PhotoMarket.css";

export const PhotoMarket = () => {
  const dispatch = useDispatch();
  const galleries = useSelector(selectAllGalleries);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("all");

  useEffect(() => {
    dispatch(fetchAllGalleries());
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

  const filteredUsers = galleries
    .map((g) => g.user)
    .flat()
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
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
        {searchBy === "all" &&
          filteredUsers.map((user, index) => (
            <div key={index} className="user-thumbnail">
              <UserThumbnail
                key={index}
                id={user.id}
                name={user.name}
                imageUrl={user.avatar}
              />
            </div>
          ))}
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
        {searchBy === "users" &&
          filteredUsers.map((user, index) => (
            <div key={index} className="user-thumbnail">
              <UserThumbnail
                key={index}
                id={user.id}
                name={user.name}
                imageUrl={user.avatar}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
