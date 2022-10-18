import { useDispatch} from "react-redux";
import { getCommentsBySongIdThunkCreator } from '../../store/comments'
import { useEffect, useState } from "react";



import { postCommentBySongIdThunkCreator } from "../../store/comments"
import { useHistory } from "react-router-dom";

function Comments({ formType, song }) {

    const dispatch = useDispatch()


    const history = useHistory()

    const [body, setBody] = useState('')
    const [validateErrors, setValidateErrors] = useState([])

    useEffect(() => {
        dispatch(getCommentsBySongIdThunkCreator(song.id))
    }, [dispatch,song.id])

    useEffect(() => {
        const errors = []
        if(body.length === 0) errors.push("Comment body text is required");
        setValidateErrors(errors)
    }, [body])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = {
            body
        }

        let createdComment = await dispatch(postCommentBySongIdThunkCreator(payload, song.id))
        if(createdComment && validateErrors.length === 0) {
            history.push(`/songs/${song.id}`)
        }

        setBody('')
    }

    let context;

    if(formType === 'loginPage1') {
      context = (
          <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
          </form>
      );
    } else {

    }
    


    return (
      <div>
        {context}
      </div>
    );
}

export default Comments