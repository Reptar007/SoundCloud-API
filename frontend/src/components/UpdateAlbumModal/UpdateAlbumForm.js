import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


import LoadingSpinner from "../Loading";

import { updateAnAlbumThunkCreator } from "../../store/albums";

export default function UpdateAlbumForm({ album, setShowModal }) {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(album.title || "");
  const [description, setDescription] = useState(album.description || "");
  const [imageUrl, setImageUrl] = useState(album.imageUrl || '');
  const [validateErrors, setValidateErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (title.length === 0) errors.title = "Album title is required";
    if (title.length > 50)
      errors.title = "Album title can't be longer than 100 characters";
    if (!/^\S+.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(imageUrl))
      errors.imageUrl = "Image must end with jpeg, jpg, or png and no spaces";
    if (description.length === 0) errors.description = "Can't be empty";
    if (description.length > 250)
      errors.description = "Description can't be longer than 250 characters";
    setValidateErrors(errors);
  }, [title, description, imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setIsLoading(true);

    if (Object.keys(validateErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    const payload = {
      title,
      description,
      imageUrl,
    };

    console.log(payload)

    const createdAlbum = await dispatch(updateAnAlbumThunkCreator(payload, album.id));
    if (createdAlbum && Object.keys(validateErrors).length === 0) {
      setShowModal(false);
    }

    setTitle("");
    setDescription("");
    setImageUrl("");
    setValidateErrors({});
    setIsLoading(false);
  };

  const updateImage = (e) => {
    const image = e.target.files[0];
    if (image) setImageUrl(image);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>
            Update your
          </h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          {hasSubmitted && validateErrors.title && (
            <li className="errors">
              <img
                className="errorDuck"
                src="https://i.imgur.com/7OuSWd1.png"
                alt=""
              />{" "}
              {validateErrors.title}
            </li>
          )}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          {hasSubmitted && validateErrors.description && (
            <li className="errors">
              <img
                className="errorDuck"
                src="https://i.imgur.com/7OuSWd1.png"
                alt=""
              />{" "}
              {validateErrors.description}
            </li>
          )}
          <input type="file" id="file-input-image" onChange={updateImage} />
          <label for="file-input-image">
            {imageUrl ? imageUrl: "Choose an image..."}
          </label>
          {hasSubmitted && validateErrors.imageUrl && (
            <li className="errors">
              <img
                className="errorDuck"
                src="https://i.imgur.com/7OuSWd1.png"
                alt=""
              />{" "}
              {validateErrors.imageUrl}
            </li>
          )}
          <button type="submit">Update Album</button>
        </form>
      )}
    </>
  );
}
