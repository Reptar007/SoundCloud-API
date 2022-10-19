import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './player.css'

import { useRef } from 'react'
import { useSelector } from "react-redux";
import { usePlayer } from '../../context/player'

const Player = () => {
  const song = useSelector(state => state.songs.current)

  const {setIsPlay, isPaused, setIsPaused} = usePlayer()

  const player = useRef()

  if(isPaused === false) {
    if(song) {
      player.current.audio.current.play()
      setIsPaused(null)
      setIsPlay(true)
    }
  }

  if(isPaused) {
    if(song) {
      player.current.audio.current.pause()
      setIsPaused(null)
      setIsPlay(false)
    }
  }

  return (
    <footer>
      <div className="audiobar">
        <AudioPlayer
          showJumpControls={true}
          layout="horizontal-reverse"
          src={song?.url}
          ref={player}
          onPlay={(e) => {
            setIsPlay(true)
            setIsPaused(false)
          }}
          onPause={e => {
            setIsPlay(false)
            setIsPaused(true)
          }}
        />
        <div className="audioInfo">
          <div className="audioImg">
            <img src={song.imageUrl} alt='' />
          </div>
          <div className="audiotext">
            <p className="one">{song?.User?.username}</p>
            <p className="two">{song.title}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Player;
