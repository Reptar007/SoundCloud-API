import { useDispatch } from 'react-redux'
import { deleteCommentByUserThunkCreator } from '../../store/comments'

function CommentCard ({ comment, user}) {
    const dispatch = useDispatch()
    
    let removed = false

    if (user?.id === comment.userId) {
        removed = true
    }


      return (
        <div>
          <li>{comment.body}</li>
          {removed &&
            <button onClick={() => dispatch(deleteCommentByUserThunkCreator(comment.id))}>delete</button>
          }
        </div>
      );
}

export default CommentCard