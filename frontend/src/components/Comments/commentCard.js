import { useDispatch } from 'react-redux'
import { deleteCommentByUserThunkCreator } from '../../store/comments'
import moment from 'moment'


function CommentCard ({ comment, user}) {
    const dispatch = useDispatch()
    
    let removed = false

    if (user?.id === comment.userId) {
        removed = true
    }

      return (
        <div className='commets'>
          <div className='commentLeft'>
            <div className='commentPic'>
              <img src='https://i.imgur.com/Ivu8gkZ.png' alt='' />
            </div>
            <div className='commentText'>
              <p className='one italic'>{comment?.User?.username}</p>
            </div>
          </div>
          <div className='commentMiddle'>
              <p className='two'>{comment?.body}</p>
          </div>
          <div className='commentRight'>
            <p>{moment(new Date(comment?.createdAt)).fromNow()}</p>
            {removed &&
              <button className='commentBtn1' onClick={() => dispatch(deleteCommentByUserThunkCreator(comment.id))}>
                <i className='fas fa-regular fa-trash'/>
              </button>
            }
          </div>
        </div>
      );
}

export default CommentCard