import { useSelector } from "react-redux";

import { getAllSongs } from "../../store/songs";

import SongCard from "../Songs/songCard"

import './UserLoginPage.css'

function UserLoginPage({ user }) {
    const songs = useSelector(getAllSongs);


    return (
      <div className="bodycontainer">
        <div className="minicontainer paddingLeft paddingTop">
          <h1 className="loginTitle">Hear what other Quaksters are Hatching</h1>
          <div className="UserSongCard">
          {songs.map((song) => (
            <SongCard key={song.id} formType={"loginpage"} user={user} song={song} />
          ))}
          </div>
        </div>
      </div>
    );
}

export default UserLoginPage