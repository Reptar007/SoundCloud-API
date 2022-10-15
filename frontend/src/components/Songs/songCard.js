import { useDispatch } from "react-redux";
import { removeSongThunkCreator } from "../../store/songs";
import UpdateFormModal from "../UpdateSongModal";
import Comments from "../Comments";


const SongCard = ({song, formType}) => {
  const dispatch = useDispatch()

  let content;
  if(formType === 'normal') {
    content = (
      <div>
        <h3>{song.title}</h3>
        <Comments song={song}/>
      </div>
    )
  } else if(formType === 'profile') {
    content = (
      <span>
        <h3>{song.title}</h3>
        <button onClick={() => dispatch(removeSongThunkCreator(song.id))}> delete </button>
        <UpdateFormModal song={song}/>
      </span>
    )
  }

    return (
      <div>
        {content}
      </div>
    );
}

export default SongCard