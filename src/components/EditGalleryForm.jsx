import { useState } from "react";
import { useDispatch } from "react-redux";
import "./PhotoUpload.css";
import { useSelector } from "react-redux";
import { editGallery } from "../store/user/thunks";
import { selectGalleryDetails } from "../store/gallery/selectors";
import { Input, Button } from "../styled";

export const EditGalleryForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [thumbnail, setThumbnail] = useState("");
  const galleryDetails = useSelector(selectGalleryDetails);
  const { id } = galleryDetails;

  const submitEditedSpace = (event) => {
    event.preventDefault();
    dispatch(editGallery(id, name, description, date, thumbnail));
    refreshPage();
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <h3>Edit your gallery!</h3>
      <form onSubmit={submitEditedSpace}>
        <p>
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
          />
        </p>
        <p>
          <Input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
          />
        </p>
        <p>
          <Input
            type="date"
            value={date}
            placeholder="Date"
            onChange={(event) => setDate(event.target.value)}
          />
        </p>
        <p>
          <Input
            type="text"
            value={thumbnail}
            placeholder="Price"
            onChange={(event) => setThumbnail(event.target.value)}
          />
        </p>
        <br />
        <Button type="submit">Update gallery</Button>
      </form>
    </div>
  );
};
