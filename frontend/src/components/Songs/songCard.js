import { useDispatch } from "react-redux";
import { removeSongThunkCreator } from "../../store/songs";
import UpdateFormModal from "../UpdateSongModal";



const SongCard = ({song, formType}) => {
  const dispatch = useDispatch()



  let content;
  if(formType === 'normal') {
    content = (
      <h3>{song.title}</h3>
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
      <li>
        {content}
      </li>
    );
}

export default SongCard