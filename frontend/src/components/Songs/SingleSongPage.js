import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { getCommentsBySongIdThunkCreator, getAllComments} from "../../store/comments";
import { getSongById } from '../../store/songs'

import Comments from '../Comments/index'

function SingleSongPage () {
    const dispatch = useDispatch()
    const {songId} = useParams()
    
    const song = useSelector(getSongById(+songId))
    const comments = useSelector(getAllComments)

    
    
    useEffect(() => {
        dispatch(getCommentsBySongIdThunkCreator(+songId))
    }, [dispatch,songId])
    
    if(!song) return null
    if(!comments) return null
    
    return (
        <div>
            <h1>{song?.title}</h1>
            <Comments song={song}/>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id} >{comment.body}</li>
                ))}
            </ul>
        </div>
    )
}

export default SingleSongPage