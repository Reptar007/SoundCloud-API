import { useDispatch, useSelector} from "react-redux";
import { getCommentsBySongIdThunkCreator } from '../../store/comments'
import { useEffect, useState } from "react";

import { postCommentBySongIdThunkCreator } from "../../store/comments"
import { useHistory } from "react-router-dom";

function Comments({ formType, song }) {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    const [body, setBody] = useState('')
    const [validateErrors, setValidateErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    
    useEffect(() => {
      dispatch(getCommentsBySongIdThunkCreator(song?.id))
    }, [dispatch,song.id])
    
    useEffect(() => {
      const errors = []
      if(body.length === 0) errors.push("Comment body text is required");
      if(body.length > 250) errors.push('comments can only be 250 characters long')
      setValidateErrors(errors)
    }, [body])
    
    if(!song) return null
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        setHasSubmitted(true)

        if(user === null) {
          window.alert('Opps gotta sign-in to do that')
          setValidateErrors([])
          return
        }

        if(validateErrors.length > 0) return
        
        const payload = {
            body
        }

        let createdComment = await dispatch(postCommentBySongIdThunkCreator(payload, song.id))
        if(createdComment && validateErrors.length === 0) {
            history.push(`/songs/${song.id}`)
        }

        setBody('')
        setValidateErrors([])
        setHasSubmitted(false)
    }

    let context;

    if(formType === 'loginPage1') {
      context = (
        <form onSubmit={handleSubmit}>
          <input
            className="loginCommentInput"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Eggsplain your thoughts in the comments, but please, no fowl play "
          />
          {hasSubmitted &&
            validateErrors.length > 0 &&
            validateErrors.map((error, idx) => (
              <li className="errors" key={idx}>
                {error}
              </li>
            ))}
        </form>
      );
    } else if(formType === 'singlesong') {
      context = (
        <form onSubmit={handleSubmit}>
          <input
            className="singleSongInput"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Eggsplain your thoughts in the comments, but please, no fowl play "
          />
          <div className="commentError">
            {hasSubmitted &&
              validateErrors.length > 0 &&
              validateErrors.map((error, idx) => (
                <li className="errors" key={idx}>
                  <img
                    className="errorDuck"
                    src="https://i.imgur.com/7OuSWd1.png"
                    alt=""
                  />{" "}
                  {error}
                </li>
              ))}
          </div>
        </form>
      );
    }
    


    return (
      <>
        {context}
      </>
    );
}

export default Comments