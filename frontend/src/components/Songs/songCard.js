
import { useDispatch, useSelector } from "react-redux";
import { removeSongThunkCreator } from "../../store/songs";
import UpdateFormModal from "../UpdateSongModal";
import { NavLink } from "react-router-dom";
import { currentSong } from "../../store/songs";
import { usePlayer } from "../../context/player";



const SongCard = ({song, formType}) => {
  const dispatch = useDispatch()
  const {isPlay, setIsPlay, setIsPaused} = usePlayer()

  const current = useSelector(state => state.songs.current)

  let setButton;
  if(!isPlay && current.url === song.url) {
    setButton = (
      <button
      className="btn"
        onClick={() => {
          dispatch(currentSong(song));
          setIsPlay(true);
          setIsPaused(false);
        }}
      >
        <i className="fas fa-solid fa-play" />
      </button>
    );
  } else if(isPlay && current.url === song.url) {
    setButton = (
      <button
      className="btn"
        onClick={() => {
          setIsPlay(false);
          setIsPaused(true);
        }}
      >
        <i className="fas fa-solid fa-pause" />
      </button>
    );
  } 
  
  if(!isPlay && current.url !== song.url) {
    setButton = (
      <button
      className="btn"
        onClick={(e) => {
          dispatch(currentSong(song));
          setIsPlay(true);
          setIsPaused(false);
        }}
      >
        <i className="fas fa-solid fa-play" />
      </button>
    );
  } else if(isPlay && current.url !== song.url) {
    setButton = (
      <button
      className="btn"
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
 
  let content;
  if(formType === 'normal') {
    content = (
      <div className="songCard">
        <NavLink  className='songTitle' to={`songs/${song.id}`}>
          <img src={song.imageUrl} alt="" />
        </NavLink>
        {setButton}
        <div className="descriptionSong">
          <p>{song.title}</p>
          <p>{song.User.username}</p>
        </div>
      </div>
    );
  } else if(formType === 'profile') {
    content = (
      <div>
        <h3>{song.title}</h3>
        <img src={song.imageUrl} alt="" />
        <button onClick={() => dispatch(removeSongThunkCreator(song.id))}>
          delete
        </button>
        <UpdateFormModal song={song} />
        {setButton}
      </div>
    );
  }

    return (
      <div>
        {content}
      </div>
    );
}

export default SongCard