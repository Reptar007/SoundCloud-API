import { useSelector } from "react-redux";
import { useState } from "react";

import { getAllSongs } from "../../store/songs";

import SongCard from "../Songs/songCard"
import LoadingSpinner from "../Loading";

import './UserLoginPage.css'

function UserLoginPage({ user }) {
    const songs = useSelector(getAllSongs);
    const [isLoading, setIsLoading] = useState(false);


    return (
      <div className="bodycontainer">
        <div className="minicontainer paddingLeft paddingTop">
          <h1 className="loginTitle">Hear what other Quaksters are Hatching</h1>
          <div className="UserSongCard">
          {isLoading ? <LoadingSpinner /> : songs.map((song) => (
            !song ? setIsLoading(true): 
            <SongCard key={song?.id} formType={"loginpage"} user={user} song={song} />
          ))}
          </div>
        </div>
      </div>
    );
}

export default UserLoginPage