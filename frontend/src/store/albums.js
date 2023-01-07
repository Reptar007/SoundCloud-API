import { csrfFetch } from "./csrf";

const GET_ALL_ALBUMS = 'albums/GETALL'
const GET_BY_ALBUMID = 'albums/GETBYID'
const GET_ALL_USER = 'albums/GETUSERALBUMS'
const POST_AN_ALBUM = 'albums/POST'
const UPDATE_ALBUM = 'albums/PUT'
const DELETE_ALBUM = 'albums/DELETE'

/* ------ ACTIONS CREATOR ------ */

const get = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        albums
    }
}

const getUser = (albums) => {
  return {
    type: GET_ALL_USER,
    albums,
  };
};

const getById = album => {
    return {
        type: GET_BY_ALBUMID,
        album
    }
}

const post = album => {
    return {
        type: POST_AN_ALBUM,
        album
    }
}

const update = album => {
    return {
        type: UPDATE_ALBUM,
        album
    }
}

const remove = albumId => {
    return {
        type: DELETE_ALBUM,
        albumId
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
        dispatch(getUser(albums))
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

export const createAnAlbumThunkCreator = ({title, description, imageUrl}) => async dispatch => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("image", imageUrl)

    const res = await csrfFetch("/api/albums", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if(res.ok) {
        const album = await res.json()
        dispatch(post(album))
        return album
    }

}

export const updateAnAlbumThunkCreator = ({title, description, imageUrl}, id) => async dispatch => {

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description);
    formData.append('image', imageUrl);

    const res = await csrfFetch(`/api/albums/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if(res.ok) {
        const album = await res.json()
        dispatch(update(album))
        return album
    }
};

export const removeAlbumThunkCreator = albumId => async dispatch => {
    const res = await csrfFetch(`/api/albums/${albumId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(remove(albumId))
    }
}


/* ------ HELPER FUNCTIONS ------ */

export const getAllAlbums  = (state) => Object.values(state.albums.allAlbums)

/* ------ REDUCERS ------ */

const initialState = {
    allAlbums: {},
    userAlbums: {},
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
        case GET_ALL_USER:
            action.albums.Albums.forEach(album => {
                albumState.userAlbums[album.id] = album
            })
            return albumState
        case POST_AN_ALBUM:
            albumState.allAlbums[action.album.id] = action.album
            return albumState
        case UPDATE_ALBUM:
            albumState.allAlbums[action.album.id] = action.album
            return albumState
        case DELETE_ALBUM:
            delete albumState.allAlbums[action.albumId]
            return albumState
        default:
            return state
    }
}

export default albumReducer