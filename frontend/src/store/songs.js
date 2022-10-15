import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/GETALLSONGS'
const POST_A_SONG = 'songs/POSTASONG'
const DELETE_SONG = 'songs/DELETE'
const UPDATE_SONG = 'song/UPDATE'

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

const remove = songId => {
    return {
        type: DELETE_SONG,
        songId
    }
}

const update = song => {
    return {
        type: UPDATE_SONG,
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
    const res = await csrfFetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if(res.ok) {
        const song = await res.json()
        dispatch(post(song))
        return song
    } 
}

export const getSongsByArtistThunkCreator = (id) => async dispatch => {
    const res = await csrfFetch(`/api/artists/${id}/songs`);

    if(res.ok) {
        const songs = await res.json()
        dispatch(get(songs))
        return songs
    }
}

export const removeSongThunkCreator = (songId) => async dispatch => {
  
    const res = await csrfFetch(`/api/songs/${songId}`, {
        method: 'DELETE'
    })
    
    if(res.ok) {
        dispatch(remove(songId))
    }
}

export const updateSongThunkCreator = (payload, id) => async dispatch => {
    console.log('this is payload: ', payload)
    const res = await csrfFetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if(res.ok) {
        const song = await res.json()
        dispatch(update(song))
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
        case DELETE_SONG:
            const removedState = { ...state}
            delete removedState[action.songId]
            return removedState
        case UPDATE_SONG:
            const updatedState = { ...state}
            updatedState[action.song.id] = action.song
            return updatedState
         default:
            return state
    }
}

export default songReducer