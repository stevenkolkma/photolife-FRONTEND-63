import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPhotoDetails } from "../store/gallery/selectors";
import { useDispatch } from "react-redux";
import { Button, Input } from "../styled";
import { editPhoto } from "../store/user/thunks";

export const EditPhotoForm = () => {
  const dispatch = useDispatch();
  const photoDetails = useSelector(selectPhotoDetails);
  const { id } = photoDetails;
  const [name, setName] = useState(photoDetails.name);
  const [caption, setCaption] = useState(photoDetails.caption);
  const [metaData, setMetaData] = useState(photoDetails.metaData);
  const [price, setPrice] = useState(0);

  const submitEditedSpace = (event) => {
    event.preventDefault();
    dispatch(editPhoto(id, name, caption, metaData, price));
    refreshPage();
  };
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
      <h3>Edit space: </h3>
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
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="Caption"
          />
        </p>
        <p>
          <Input
            type="text"
            value={metaData}
            placeholder="Meta Data"
            onChange={(event) => setMetaData(event.target.value)}
          />
        </p>
        <p>
          <Input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </p>
        <br />
        <Button type="submit">Update photo</Button>
      </form>
    </div>
  );
};
