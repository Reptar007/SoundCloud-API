
import { useDispatch, useSelector } from "react-redux";
import { removeSongThunkCreator } from "../../store/songs";
import UpdateFormModal from "../UpdateSongModal";
import { NavLink } from "react-router-dom";
import { currentSong } from "../../store/songs";
import { usePlayer } from "../../context/player";



const SongCard = ({song, formType}) => {
  const dispatch = useDispatch()
  const {isPlay, setIsPlay, isPaused, setIsPaused} = usePlayer()

  const current = useSelector(state => state.songs.current)

  let setButton;
  if(!isPlay && current.url === song.url) {
    setButton = (
      <button onClick={() =>{
        dispatch(currentSong(song))
        setIsPlay(true)
        setIsPaused(false)
      }}>Play</button>
    )
  } else if(isPlay && current.url === song.url) {
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
  
  if(!isPlay && current.url !== song.url) {
    setButton = (
      <button
        onClick={ e => {
          dispatch(currentSong(song))
          setIsPlay(true)
          setIsPaused(false)
        }}
      >
        Play
      </button>
    )
  } else if(isPlay && current.url !== song.url) {
    setButton = (
      <button
        onClick={ e => {
           dispatch(currentSong(song));
           setIsPlay(true);
           setIsPaused(false);
        }}
      >
        Play
      </button>
    )
  }
 

  let content;
  if(formType === 'normal') {
    content = (
      <div>
        <NavLink to={`songs/${song.id}`}>
          <h3>{song.title}</h3>
        </NavLink>
        {setButton}
      </div>
    )
  } else if(formType === 'profile') {
    content = (
      <span>
        <h3>{song.title}</h3>
        <button onClick={() => dispatch(removeSongThunkCreator(song.id))}>
          delete
        </button>
        <UpdateFormModal song={song} />
        {setButton}
      </span>
    );
  }

    return (
      <div>
        {content}
      </div>
    );
}

export default SongCard