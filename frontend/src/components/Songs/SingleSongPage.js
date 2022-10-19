import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { getCommentsBySongIdThunkCreator, getAllComments} from "../../store/comments";
import { getSongById } from '../../store/songs'
import CommentCard from '../Comments/commentCard'
import { currentSong } from "../../store/songs";

import { usePlayer } from "../../context/player";
import Comments from '../Comments/index'

import './SingleSongPage.css'

function SingleSongPage () {
    const dispatch = useDispatch()
    const { songId } = useParams()
    const { isPlay, setIsPlay, setIsPaused } = usePlayer();
    
    const song = useSelector(getSongById(+songId))
    const comments = useSelector(getAllComments)
    const user = useSelector(state => state.session.user)
    console.log(comments)
    
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
          className="singlebtn"
          onClick={() => {
            dispatch(currentSong(song));
            setIsPlay(true);
            setIsPaused(false);
          }}
        >
          <i className="fas fa-solid fa-play" />
        </button>
      );
    } else if (isPlay && current.url === song.url) {
      setButton = (
        <button
          className="singlebtn"
          onClick={() => {
            setIsPlay(false);
            setIsPaused(true);
          }}
        >
          <i className="fas fa-solid fa-pause" />
        </button>
      );
    }

    if (!isPlay && current.url !== song.url) {
      setButton = (
        <button
          className='singlebtn'
          onClick={(e) => {
            dispatch(currentSong(song));
            setIsPlay(true);
            setIsPaused(false);
          }}
        >
          <i className="fas fa-solid fa-play" />
        </button>
      );
    } else if (isPlay && current.url !== song.url) {
      setButton = (
        <button
          className="singlebtn"
          onClick={(e) => {
            dispatch(currentSong(song));
            setIsPlay(true);
            setIsPaused(false);
          }}
        >
          <i className="fas fa-solid fa-play" />
        </button>
      );
    }
    
    return (
      <div className="bodycontainer">
        <div className="singlePage">
          <div className="borderBkimage">
            <div
              className="singleBkImage"
              style={{
                backgroundImage: `url(${song?.imageUrl})`,
              }}
            >
              <div className="singleImage">
                <img src={song.imageUrl} alt="" />
              </div>
              <div className="singlePlayDescription">
                {setButton}
                <div className="singleDescriptionSong">
                  <p className="one bold">{song?.title}</p>
                  <p className="two italic">{song?.User?.username}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="singleComments">
            <div className="singleCommentBar">
              <img src="https://i.imgur.com/i9i0UBU.png" alt="" />
              <div className="singleCommentInput">
                <Comments formType={"singlesong"} song={song} />
              </div>
            </div>
            <div className="singleAllComments">
              <div className='commentstext'>
                <i className="fas fa-solid fa-comment" />
                <p>{comments.length} comments</p>
              </div>
              {comments?.map((comment) => (
                <CommentCard key={comment.id} comment={comment} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default SingleSongPage