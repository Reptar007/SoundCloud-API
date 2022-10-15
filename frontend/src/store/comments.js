import { csrfFetch } from "./csrf";

const GET_COMMENTS_BY_SONGID = 'comments/GETALLBYSONGID'


/* ----- ACTIONS CREATOR----- */


const get = comments => {
    return {
        type: GET_COMMENTS_BY_SONGID,
        comments
    }
} 


/* ----- THUNKS CREATOR----- */


export const getCommentsBySongIdThunkCreator = id => async dispatch => {
    const res = await csrfFetch(`/api/songs/${id}/comments`)

    if(res.ok) {
        const comments = await res.json()
        dispatch(get(comments))
        return comments
    }
}

/* ----- HELPER FUNCTIONS ----- */

export const getAllComments = (state) => Object.values(state.comments)


/* ----- REDUCERS ----- */


const commentReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_COMMENTS_BY_SONGID:
            const commentsState = {}
            action.comments.Comments.forEach(comment => {
                commentsState[comment.id] = comment
            })
            return commentsState
        default:
            return state
    }
}

export default commentReducer