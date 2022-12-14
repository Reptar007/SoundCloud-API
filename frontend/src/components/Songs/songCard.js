import { useDispatch, useSelector} from "react-redux";
import { removeSongThunkCreator, getAllSongsThunkCreator} from "../../store/songs";
import UpdateFormModal from "../UpdateSongModal";
import { NavLink } from "react-router-dom";
import { currentSong } from "../../store/songs";
import { usePlayer } from "../../context/player";
import Comments from '../Comments'
import { useEffect} from "react";
import moment from "moment";



const SongCard = ({song, formType, user }) => {
  const dispatch = useDispatch()
  const {isPlay, setIsPlay, setIsPaused} = usePlayer()

 
  
  useEffect(() => {
    dispatch(getAllSongsThunkCreator())
  }, [dispatch])
  
  const current = useSelector(state => state.songs.current)


  let setButton;
  if(!isPlay && current.url === song.url) {
    setButton = (
      <button
        className={user ? "loginBtn" : "btn"}
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
        className={user ? "loginBtn" : "btn"}
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
        className={user ? "loginBtn" : "btn"}
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
        className={user ? "loginBtn" : "btn"}
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
        <NavLink  className='songTitle' to={`songs/${song?.id}`}>
          <img src={song?.imageUrl} alt="" />
        </NavLink>
        {setButton}
        <div className="descriptionSong">
          <p className="one" >{song?.title}</p>
          <p className="two" >{song?.User?.username}</p>
        </div>
      </div>
    );
  } else if(formType === 'profile') {
    content = (
      <div className="songsProfile">
        <div className="song">
          <img src={song?.imageUrl} alt="" />
        </div>
        <div className="soundProfile">
          <div className="soundProfileLeft">
            <div className="soundProfileSongInfo">
              {setButton}
              <div>
                <p className="one loginText italic">{song?.title}</p>
                <p className="two loginText bold">{user.username}</p>
              </div>
            </div>
            <div className="profileButtons">
              <UpdateFormModal song={song} />
              <button
                onClick={() => dispatch(removeSongThunkCreator(song?.id))}
              >
                <i className="fas fa-regular fa-trash" />
              </button>
            </div>
          </div>
          <div className="soundProfileRight">
            <p>{moment(new Date(song?.createdAt)).fromNow()}</p>
          </div>
        </div>
      </div>
    );
  } else if (formType === "loginpage") {
    content = (
      <div className="songs">
        <div className="songsImage">
          <NavLink className="song" to={`/songs/${song?.id}`}>
            <img src={song.imageUrl} alt="" />
          </NavLink>
        </div>
        <div
          className="sound"
          style={{
            backgroundImage: `url(${song?.imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="songInfo">
            {setButton}
            <div>
              <p className="one loginText italic">{song?.title}</p>
              <p className="two loginText bold">{user?.username}</p>
            </div>
          </div>
          <div className="loginComments">
            <Comments formType={"loginPage1"} song={song} />
          </div>
        </div>
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