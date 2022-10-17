import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './player.css'

import { useRef } from 'react'
import { useSelector } from "react-redux";
import { usePlayer } from '../../context/player'
import SingleSongPage from "../Songs/SingleSongPage";

const Player = () => {
  const song = useSelector(state => state.songs.current)

  const {isPlay, setIsPlay, isPaused, setIsPaused} = usePlayer()

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
      <AudioPlayer
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
    </footer>
  );
};

export default Player;
