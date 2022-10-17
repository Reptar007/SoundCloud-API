import { createContext, useContext, useState } from "react";

export const PlayerContext = createContext()

export const usePlayer = () => useContext(PlayerContext)

export default function PlayerProvider(props) {
    const [isPlay, setIsPlay] = useState()
    const [isPaused, setIsPaused] = useState()

    return (
        <PlayerContext.Provider value={{ isPlay, setIsPlay, isPaused, setIsPaused}}>
            {props.children}
        </PlayerContext.Provider>
    )

}
