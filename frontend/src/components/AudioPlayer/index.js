import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './player.css'

import { useSelector } from "react-redux";
import SingleSongPage from "../Songs/SingleSongPage";

const Player = () => {
  const song = useSelector(state => state.songs.current)


  return (
    <footer>
      <AudioPlayer
        src={song?.url}
        onPlay={(e) => console.log("onPlay")}
      />
    </footer>
  );
};

export default Player;
