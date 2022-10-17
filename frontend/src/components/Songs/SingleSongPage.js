import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { getCommentsBySongIdThunkCreator, getAllComments} from "../../store/comments";
import { getSongById } from '../../store/songs'
import CommentCard from '../Comments/commentCard'
import { currentSong } from "../../store/songs";

import { usePlayer } from "../../context/player";
import Comments from '../Comments/index'

function SingleSongPage () {
    const dispatch = useDispatch()
    const { songId } = useParams()
    const { isPlay, setIsPlay, isPaused, setIsPaused } = usePlayer();
    
    const song = useSelector(getSongById(+songId))
    const comments = useSelector(getAllComments)
    const user = useSelector(state => state.session.user)
    
    useEffect(() => {
        dispatch(getCommentsBySongIdThunkCreator(+songId))
    }, [dispatch,songId])
    
    const current = useSelector((state) => state.songs.current);

    if(!song) return null
    if(!comments) return null


    let setButton;
    if (!isPlay && current.url === song.url) {
      setButton = (
        <button
          onClick={() => {
            dispatch(currentSong(song));
            setIsPlay(true);
            setIsPaused(false);
          }}
        >
          Play
        </button>
      );
    } else if (isPlay && current.url === song.url) {
      setButton = (
        <button
          onClick={() => {
            setIsPlay(false);
            setIsPaused(true);
          }}
        >
          Pause
        </button>
      );
    }

    if (!isPlay && current.url !== song.url) {
      setButton = (
        <button
          onClick={(e) => {
            dispatch(currentSong(song));
            setIsPlay(true);
            setIsPaused(false);
          }}
        >
          Play
        </button>
      );
    } else if (isPlay && current.url !== song.url) {
      setButton = (
        <button
          onClick={(e) => {
            dispatch(currentSong(song));
            setIsPlay(true);
            setIsPaused(false);
          }}
        >
          Play
        </button>
      );
    }
    
    return (
        <div>
            <h1>{song.title}</h1>
            {setButton}
            <Comments song={song}/>
            <section>
                {comments?.map(comment => (
                    <CommentCard comment={comment} user={user}/>
                ))}
            </section>
        </div>
    )
}

export default SingleSongPage