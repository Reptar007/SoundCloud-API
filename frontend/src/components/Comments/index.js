import { useDispatch, useSelector } from "react-redux";
import { getCommentsBySongIdThunkCreator, getAllComments } from "../../store/comments";
import { useEffect, useState } from "react";

function Comments({ song }) {
    
    const dispatch = useDispatch()
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

    const comments = useSelector(getAllComments)

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Comment:
            <input
                type='text'
                value={body}
                onChange={e => setBody(e.target.value)}
                required
            />
          </label>
        </form>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.body}</li>
                ))}
             </ul>
      </div>
    );
}

export default Comments