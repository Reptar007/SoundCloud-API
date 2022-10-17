import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './player.css'

const audio = require('../../assets/The_Spin_Wires_-_Into_The_Night.mp3')

const Player = () => {
  return (
    <footer>
      <AudioPlayer
        src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
        onPlay={(e) => console.log("onPlay")}
      />
    </footer>
  );
};

export default Player;
