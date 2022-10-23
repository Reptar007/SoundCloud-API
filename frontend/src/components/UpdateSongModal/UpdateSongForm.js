import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


import { updateSongThunkCreator } from '../../store/songs'

function UpdateSongForm({ song, setShowModal }) {
 
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState(song.title || '');
  const [description, setDescription] = useState(song.description || '');
  const [url, setUrl] = useState(song.url || '');
  const [imageUrl, setImageUrl] = useState(song.imageUrl || '');
  const [albumId, setAlbumId] = useState(song.albumId || null);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validateErrors, setValidateErrors] = useState({});

  useEffect(() => {
    const errors = {};
    if (title.length === 0) errors.title = "Song title is required";
    if (title.length > 50)
      errors.title = "Song title can't be longer than 250 characters";
    if (url.length === 0) errors.url = "Audio is required";
     if (!/^https?:\/\/.+\.(wav|mp3|aac|flac)$/.test(url))
       errors.url = "Audio must start with http and end with wav, mp3 or acc";
     if (!/^https?:\/\/.+\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(imageUrl))
       errors.imageUrl =
         "Image must start with https and end with jpeg, jpg, or png";
    if (albumId < 0) errors.albumId = "Album ID can't be negative";
    if (description.length > 250)
      errors.description = "Description can't be longer than 250 characters";
    setValidateErrors(errors);
  }, [title, url, description, albumId, imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    if (Object.keys(validateErrors).length > 0) return;

    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId,
    };
    
    let updatedSong = await dispatch(updateSongThunkCreator(payload, song.id));

    if (updatedSong && Object.values(validateErrors).length === 0) {
      setShowModal(false)
    }

    setTitle("");
    setDescription("");
    setUrl("");
    setImageUrl("");
    setAlbumId("");
    setValidateErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update your little hatchling: </h1>
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
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Audio Url"
      />
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
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image Url"
      />
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
      <button type="submit">Update Song</button>
    </form>
  );
}

export default UpdateSongForm;
