import { createContext, useContext, useState } from "react";

export const PlayerContext = createContext()

export const usePlayer = () => useContext(PlayerContext)


