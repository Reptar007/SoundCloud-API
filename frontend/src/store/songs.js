import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/GETALLSONGS'


/* ----- ACTIONS CREATOR----- */

const get = (songs) => {
    return {
        type: GET_ALL_SONGS,
        songs
    }
}


/* ----- THUNKS CREATOR----- */

export const getAllSongsThunkCreator = () => async dispatch => {
    const res = await csrfFetch('/api/songs')

    if(res.ok) {
        const songs = await res.json()
        dispatch(get(songs))
        return songs
    }
}

/* ----- HELPER FUNCTIONS ----- */

export const getAllSongs = (state) => Object.values(state.songs)


/* ----- REDUCERS ----- */


const songReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_ALL_SONGS:
            const songsState = {}
            action.songs.Songs.forEach(song => {
                songsState[song.id] = song
            })
            return songsState
        default:
            return state
    }
}

export default songReducer