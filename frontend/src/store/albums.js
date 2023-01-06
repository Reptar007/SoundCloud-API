import { csrfFetch } from "./csrf";

const GET_ALL_ALBUMS = 'albums/GETALL'
const GET_BY_ALBUMID = 'albums/GETBYID'


/* ------ ACTIONS CREATOR ------ */

const get = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        albums
    }
}

const getById = album => {
    return {
        type: GET_BY_ALBUMID,
        album
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

export const getAlbumByIdThunkCreator = id => async dispatch => {
    const res = await csrfFetch(`/api/albums/${id}`)

    if (res.ok) {
        const album = await res.json()
        dispatch(getById(album))
        return album
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
        case GET_BY_ALBUMID:
            return {
                ...state,
                current: action.album
            }
        default:
            return state
    }
}

export default albumReducer