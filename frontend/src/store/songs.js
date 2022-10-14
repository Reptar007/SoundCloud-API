import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/GETALLSONGS'
const POST_A_SONG = 'songs/POSTASONG'


/* ----- ACTIONS CREATOR----- */

const get = (songs) => {
    return {
        type: GET_ALL_SONGS,
        songs
    }
}

const post = song => {
    return {
        type: POST_A_SONG,
        song
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

export const createASongThunkCreator = (payload) => async dispatch => {
    console.log('this is my paylaod: ', payload)
    const res = await csrfFetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if(res.ok) {
        const song = await res.json()
        dispatch(post(song))
        console.log(song)
        return song
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
        case POST_A_SONG:
            const addSong = { ...state}
            addSong[action.song.id] = action.song
            return addSong
         default:
            return state
    }
}

export default songReducer