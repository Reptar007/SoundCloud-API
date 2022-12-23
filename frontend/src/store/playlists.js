import { csrfFetch } from "./csrf";

const GET_PLAYLIST_CURRENT_USER = 'playlist/CURRENT'


/* ----- ACTIONS CREATOR ----- */

const get = playlists => {
    return {
        type: GET_PLAYLIST_CURRENT_USER,
        playlists
    }
}

/* ----- THUNKS CREATOR ----- */

export const getPlaylistsByCurrentUser = () => async dispatch => {
    const res = await csrfFetch('/api/playlists/current')

    if(res.ok) {
        const playlists = await res.json()
        dispatch(get(playlists))
        return playlists
    }
}

/* ----- REDUCERS ------ */

const initialSate = {
    playlists: {},
    current: {}
}

const playlistReducer = (state = initialSate, action) => {
    const playlistState = {...state}
    switch(action.type) {
        case GET_PLAYLIST_CURRENT_USER:
            action.playlists.Playlists.forEach(playlist => {
                playlistState.playlists[playlist.id] = playlist
            })
            return playlistState
        default:
            return state
    }
}

export default playlistReducer