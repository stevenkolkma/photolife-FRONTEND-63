import { useState } from "react";
import { useDispatch } from "react-redux";
import "./PhotoUpload.css";
import { useSelector } from "react-redux";
import { postNewGallery } from "../store/user/thunks";
import { selectUser } from "../store/user/selectors";

export const GalleryUpload = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [thumbnail, setThumbnail] = useState("");
  const user = useSelector(selectUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const galleryData = {
      name,
      description,
      date: date,
      thumbnail,
      userId: user.id,
    };
    console.log(galleryData);
    dispatch(postNewGallery(galleryData));
  };

  return (
    <div>
      <h1>Upload a new gallery</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Thumbnail:
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </label>
        <input type="submit" onClick={handleSubmit} value="Upload" />
      </form>
    </div>
  );
};
