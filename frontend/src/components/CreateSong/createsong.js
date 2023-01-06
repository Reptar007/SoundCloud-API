import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import LoadingSpinner from "../Loading";

import { createASongThunkCreator } from "../../store/songs";

import "./CreateSongForm.css";

function CreateSongForm({ user,back }) {
  const albums = useSelector((state) => Object.values(state.albums.allAlbums));
  let userAlbums = albums.filter((album) => album.userId === user.id);

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [albumId, setAlbumId] = useState("");
  const [validateErrors, setValidateErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const errors = {};
    if (title.length === 0) errors.title = "Song title is required";
    if (title.length > 50)
      errors.title = "Song title can't be longer than 100 characters";
    if (url.length === 0) errors.url = "Audio is required";
    if (albumId.length === 0)
      errors.albumId = "Pick an option, its ok if it's none";
    if (!/^\S+.(wav|mp3|aac|flac)$/.test(url?.name))
      errors.url = "Audio must end with wav, mp3 or acc and no spaces";
    if (!/^\S+.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(imageUrl?.name))
      errors.imageUrl = "Image must end with jpeg, jpg, or png and no spaces";
    if (description.length > 250)
      errors.description = "Description can't be longer than 250 characters";
    setValidateErrors(errors);
  }, [title, url, description, imageUrl, albumId]);

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
      url,
      imageUrl,
      albumId,
    };

    let createdSong = await dispatch(createASongThunkCreator(payload));
    if (createdSong && Object.keys(validateErrors).length === 0) {
      history.push(`/${user.id}`);
    }

    setTitle("");
    setDescription("");
    setUrl("");
    setImageUrl("");
    setValidateErrors({});
    setIsLoading(false);
  };

  const updateUrl = (e) => {
    const url = e.target.files[0];
    if (url) setUrl(url);
  };

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
            Ready to create <br /> your hatchling?
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
          <input type="file" id="file-input-audio" onChange={updateUrl} />
          <label for="file-input-audio">
            {url ? url.name : "Choose an audio..."}
          </label>
          {hasSubmitted && validateErrors.url && (
            <li className="errors">
              <img
                className="errorDuck"
                src="https://i.imgur.com/7OuSWd1.png"
                alt=""
              />{" "}
              {validateErrors.url}
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
          <select value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
            <option disabled={true} value="">
              Choose an album...
            </option>
            <option value={"null"}>None</option>
            {userAlbums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
          {hasSubmitted && validateErrors.albumId && (
            <li className="errors">
              <img
                className="errorDuck"
                src="https://i.imgur.com/7OuSWd1.png"
                alt=""
              />{" "}
              {validateErrors.albumId}
            </li>
          )}
    
            <button onClick={back}>Back</button>
            <button type="submit">Create Song</button>
 
        </form>
      )}
    </div>
  );
}

export default CreateSongForm;
