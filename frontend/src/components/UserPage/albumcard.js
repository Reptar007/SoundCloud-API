import { useDispatch } from "react-redux";

import UpdateFormModal from "../UpdateAlbumModal";
import { removeAlbumThunkCreator } from "../../store/albums";

import moment from "moment";

export default function AlbumCard({ album, user }) {
  const dispatch = useDispatch()
  return (
    <div>
      <div className="songsProfile">
        <div className="song">
          <img src={album?.imageUrl} alt="" />
        </div>
        <div className="soundProfile">
          <div className="soundProfileLeft">
            <div className="soundProfileSongInfo">
              <div>
                <p className="one loginText italic">{album?.title}</p>
                <p className="two loginText bold">{user.username}</p>
              </div>
            </div>
            <div className="profileButtons">
              <UpdateFormModal album={album} />
              <button
                onClick={() => dispatch(removeAlbumThunkCreator(album?.id))}
              >
                <i className="fas fa-regular fa-trash" />
              </button>
            </div>
          </div>
          <div className="soundProfileRight">
            <p>{moment(new Date(album?.createdAt)).fromNow()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
