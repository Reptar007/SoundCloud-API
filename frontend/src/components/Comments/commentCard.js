import { useDispatch } from 'react-redux'
import { deleteCommentByUserThunkCreator } from '../../store/comments'

function CommentCard ({ comment, user}) {
    const dispatch = useDispatch()
    
    let removed = false

    if (user?.id === comment.userId) {
        removed = true
    }

    

    const createdAt = new Date(comment?.createdAt).toLocaleDateString()

      return (
        <div className='commets'>
          <div className='commentLeft'>
            <div className='commentPic'>
              <img src='https://i.imgur.com/Ivu8gkZ.png' alt='' />
            </div>
            <div className='commentText'>
              <p className='one italic'>{user?.username}</p>
            </div>
          </div>
          <div className='commentMiddle'>
              <p className='two'>{comment?.body}</p>
          </div>
          <div className='commentRight'>
            <p>{createdAt}</p>
            {removed &&
              <button className='commentBtn' onClick={() => dispatch(deleteCommentByUserThunkCreator(comment.id))}>delete</button>
            }
          </div>
        </div>
      );
}

export default CommentCard