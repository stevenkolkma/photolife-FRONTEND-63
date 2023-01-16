import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewPhoto } from "../store/user/thunks";
import { selectUser } from "../store/user/selectors";
import { selectGalleryDetails } from "../store/gallery/selectors";
import "./PhotoUpload.css";

export const PhotoUpload = (props) => {
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [metaData, setMetaData] = useState("");
  const [fileSelected, setFileSelected] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const galleryDetails = useSelector(selectGalleryDetails);
  console.log(name, caption, metaData, fileSelected);

  const uploadImage = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "vuxpezxv");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpsnohshv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const file = await response.json();
      console.log("file", file);
      setFileSelected(file);
    } catch (err) {
      console.log("error", err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const galleryId = galleryDetails.id;
    const photoData = {
      name,
      caption,
      metaData,
      imageUrl: fileSelected.url,
      publicId: fileSelected.public_id,
      galleryId: galleryId,
      userId: user.id,
    };
    console.log("photoData", photoData);
    dispatch(postNewPhoto(photoData));
    props.updateFromChild();
  };

  return (
    <div>
      <h1>Upload a new Photo</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Caption:
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </label>
        <label>
          MetaData:
          <input
            type="text"
            value={metaData}
            onChange={(e) => setMetaData(e.target.value)}
          />
        </label>
        <label>
          <input type="file" onChange={uploadImage} />
        </label>
        <input type="submit" onClick={onSubmit} value="Upload" />
      </form>
    </div>
  );
};
