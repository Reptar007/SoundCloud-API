import { useSelector } from "react-redux";

import { getAllSongs } from "../../store/songs";

import SongCard from "../Songs/songCard"

import './UserLoginPage.css'

function UserLoginPage({ user }) {


    const songs = useSelector(getAllSongs);


    return (
      <div className="bodycontainer padding">
        <h1 className="loginTitle">Hear what other Quaksters are Hatching</h1>
        <div className="UserSongCard">
        {songs.map((song) => (
          <SongCard formType={"loginpage"} user={user} song={song} />
        ))}
        </div>
      </div>
    );
}

export default UserLoginPage