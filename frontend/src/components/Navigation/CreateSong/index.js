import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'

import { createASongThunkCreator } from '../../../store/songs'

import './CreateSongForm.css'


function CreateSongForm({ user }) {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState()
    // const [albumId, setAlbumId] = useState(null)
    const [validateErrors, setValidateErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = {}
        if(title.length === 0) errors.title = "Song title is required"
        if(title.length > 50) errors.title = "Song title can't be longer than 100 characters"
        if(url.length === 0) errors.url = "Audio is required"
        if(!/^https?:\/\/.+\.(wav|mp3|aac|flac)$/.test(url)) errors.url = 'Audio must start with http and end with wav, mp3 or acc'
        if (!/^https?:\/\/.+\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(imageUrl)) errors.imageUrl ='Image must start with https and end with jpeg, jpg, or png'
        if (description.length > 250) errors.description = "Description can't be longer than 250 characters";
        setValidateErrors(errors)
    },[title, url,description,imageUrl])
    
    const handleSubmit = async(e) => {
        
        e.preventDefault()
        setHasSubmitted(true)

        if(Object.keys(validateErrors).length > 0) return

        const payload = {
            title,
            description,
            url,
            imageUrl,
            albumId: null
        }

        let createdSong = await dispatch(createASongThunkCreator(payload))
        if(createdSong && Object.keys(validateErrors).length === 0) {
            history.push(`/${user.id}`)
        }

        setTitle('')
        setDescription('')
        setUrl('')
        setImageUrl('')
        setValidateErrors({})
    }

    return (
      <div className="bodycontainer center">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Ready to create your hatchling?</h1>
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
              placeholder="Audio URL"
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
              placeholder="Image URL"
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
            <button type="submit">Create Song</button>
          </form>
        </div>
      </div>
    );

}

export default CreateSongForm