import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'

import { createASongThunkCreator } from '../../../store/songs'

import './CreateSongForm.css'


function CreateSongForm({ user }) {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState()
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState()
    const [albumId, setAlbumId] = useState(null)
    const [validateErrors, setValidateErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = []
        if(title.length === 0) errors.push("Song title is required");
        if(url.length === 0) errors.push("Audio is required");
        setValidateErrors(errors)
    },[title, url])
    
    const handleSubmit = async(e) => {
        
        e.preventDefault()
        setHasSubmitted(true)

        if(validateErrors.length > 0) return

        const payload = {
            title,
            description,
            url,
            imageUrl,
            albumId,
        }



        let createdSong = await dispatch(createASongThunkCreator(payload))
        if(createdSong && validateErrors.length === 0) {
            history.push(`/${user.id}`)
        }

        setTitle('')
        setDescription('')
        setUrl('')
        setImageUrl('')
        setAlbumId('')
        setValidateErrors('')
    }

    return (
      <div className="bodycontainer center">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Ready to create your hatchling?</h1>
            <ul className='errors'>
            {hasSubmitted && validateErrors.length > 0 && (
               validateErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
                )))}
                </ul>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder='Audio URL'
              />
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder='Image URL'
              />
              <input
                type="number"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
                placeholder='Album ID if you have one'
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Description'
              />
            <button type="submit" >
              Create Song
            </button>
          </form>
        </div>
      </div>
    );

}

export default CreateSongForm