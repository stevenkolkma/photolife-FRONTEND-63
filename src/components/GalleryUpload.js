import { useState } from "react";
import { useDispatch } from "react-redux";
import "./PhotoUpload.css";
import { postNewPhoto } from "../store/user/thunks";

export const GalleryUpload = () => {
  const dispatch = useDispatch;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photoSelected, setPhotoSelected] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(postNewPhoto(formData));
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
          Image:
          <input
            type="file"
            onChange={(event) => setPhotoSelected(event.target.files)}
          />
        </label>
        <input type="submit" onClick={handleSubmit} value="Upload" />
      </form>
    </div>
  );
};
