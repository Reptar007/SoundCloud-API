import { csrfFetch } from "./csrf";

const GET_ALL_ALBUMS = 'albums/GETALL'


/* ------ ACTIONS CREATOR ------ */

const get = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        albums
    }
}

/* ------ THUNKS CREATOR ------ */

export const getAllAlbumsThunkCreator = () => async dispatch => {
    const res = await csrfFetch('/api/albums')

    if (res.ok) {
        const albums = await res.json()
        dispatch(get(albums))
        return albums
    }
}

export const getAllAlbumsByCurrentUserThunkCreator = () => async dispatch => {
    const res = await csrfFetch('/api/albums/current')

    if (res.ok) {
        const albums = await res.json()
        dispatch(get(albums))
        return albums
    }
}

/* ------ REDUCERS ------ */

const initialState = {
    allAlbums: {},
    current: {}
}

const albumReducer = (state = initialState, action) => {
    const albumState = {...state}
    switch(action.type) {
        case GET_ALL_ALBUMS:
            action.albums.Albums.forEach(album => {
                albumState.allAlbums[album.id] = album
            })
            return albumState
        default:
            return state
    }
}

export default albumReducer