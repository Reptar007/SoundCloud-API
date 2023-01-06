import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import LoadingSpinner from "../Loading";

import { createAnAlbumThunkCreator } from "../../store/albums";

export default function CreateAlbumForm({ back }) {
  const dispatch = useDispatch()
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [validateErrors, setValidateErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (title.length === 0) errors.title = "Album title is required";
    if (title.length > 50)
      errors.title = "Album title can't be longer than 100 characters";
    if (!/^\S+.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(imageUrl?.name))
      errors.imageUrl = "Image must end with jpeg, jpg, or png and no spaces";
    if(description.length === 0) errors.description = "Can't be empty"
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
      imageUrl
    }

    const createdAlbum = await dispatch(createAnAlbumThunkCreator(payload))
    if (createdAlbum && Object.keys(validateErrors).length === 0) {
      history.push(`/albums`);
    }

    setTitle("");
    setDescription("");
    setImageUrl("");
    setValidateErrors({});
    setIsLoading(false);
  }

  const updateImage = (e) => {
    const image = e.target.files[0];
    if (image) setImageUrl(image);
  };

  return (
    <div div className="formContainer">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>
            Create a container for <br />
            all those Hatchlings:
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
            {imageUrl ? imageUrl.name : "Choose an image..."}
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
          <button onClick={back}> Back </button>
          <button type="submit">Create Album</button>
        </form>
      )}
    </div>
  );
}
