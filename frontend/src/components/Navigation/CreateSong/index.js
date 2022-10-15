import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'

import { createASongThunkCreator } from '../../../store/songs'


function CreatSongFrom({ user }) {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState()
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState()
    const [albumId, setAlbumId] = useState()
    const [validateErrors, setValidateErrors] = useState([])

    useEffect(() => {
        const errors = []
        if(title.length === 0) errors.push("Song title is required");
        if(url.length === 0) errors.push("Audio is required");
        setValidateErrors(errors)
    },[title, url])
    
    const handleSubmit = async(e) => {
        
        e.preventDefault()

        const payload = {
            title,
            description,
            url,
            imageUrl,
            albumId,
        }

        let createdSong = await dispatch(createASongThunkCreator(payload))
        if(createdSong && validateErrors.length === 0) {
            history.push('/')
        }

        setTitle('')
        setDescription('')
        setUrl('')
        setImageUrl('')
        setAlbumId('')
        setValidateErrors('')
    }

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
        <button type='submit'>Create Song</button>
      </form>
    );

}

export default CreatSongFrom