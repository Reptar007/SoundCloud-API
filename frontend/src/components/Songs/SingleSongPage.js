import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { getCommentsBySongIdThunkCreator, getAllComments} from "../../store/comments";
import { getSongById } from '../../store/songs'
import CommentCard from '../Comments/commentCard';

import Comments from '../Comments/index'

function SingleSongPage () {
    const dispatch = useDispatch()
    const {songId} = useParams()

    const [remove, setRemove] = useState(false)
    
    const song = useSelector(getSongById(+songId))
    const comments = useSelector(getAllComments)
    const user = useSelector(state => state.session.user)

    
    
    useEffect(() => {
        dispatch(getCommentsBySongIdThunkCreator(+songId))
    }, [dispatch,songId])
    
    if(!song) return null
    if(!comments) return null
    
    return (
        <div>
            <h1>{song.title}</h1>
            <Comments song={song}/>
            <section>
                {comments.map(comment => (
                    <CommentCard comment={comment} user={user}/>
                ))}
            </section>
        </div>
    )
}

export default SingleSongPage