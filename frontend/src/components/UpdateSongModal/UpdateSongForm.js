import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { updateSongThunkCreator } from '../../store/songs'

function UpdateSongForm({ song, setShowModal }) {
 
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(song.title || '');
  const [description, setDescription] = useState(song.description || '');
  const [url, setUrl] = useState(song.url || '');
  const [imageUrl, setImageUrl] = useState(song.imageUrl || '');
  const [albumId, setAlbumId] = useState(song.albumId || null);
  const [validateErrors, setValidateErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (title.length === 0) errors.push("Song title is required");
    if (url.length === 0) errors.push("Audio is required");
    setValidateErrors(errors);
  }, [title, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId,
    };


    
    let updatedSong = await dispatch(updateSongThunkCreator(payload, song.id));

    console.log('this is my updated song: ', updatedSong)
    if (updatedSong && validateErrors.length === 0) {
      setShowModal(false)
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {validateErrors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Audio Url:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <label>
        Image Url:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <label>
        Album Id:
        <input
          type="number"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Update Song</button>
    </form>
  );
}

export default UpdateSongForm;
