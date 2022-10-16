import { csrfFetch } from "./csrf";

const GET_COMMENTS_BY_SONGID = 'comments/GETALLBYSONGID'
const POST_A_COMMENT_BY_SONGID = 'comments/POSTACOMMENTBYSONGID'
const DELETE_COMMENT_BY_USER = 'comments/DELETE'

/* ----- ACTIONS CREATOR----- */


const get = comments => {
    return {
        type: GET_COMMENTS_BY_SONGID,
        comments
    }
} 

const post = comment => {
    return {
        type: POST_A_COMMENT_BY_SONGID,
        comment
    }
}

const remove = commentId => {
    return {
        type: DELETE_COMMENT_BY_USER,
        commentId
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

export const postCommentBySongIdThunkCreator = (payload, id) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if(res.ok) {
        const comment = await res.json()
        dispatch(post(comment))
        return comment
    }
}

export const deleteCommentByUserThunkCreator = commentId => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    
    if(res.ok) {
        dispatch(remove(commentId))
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
        case POST_A_COMMENT_BY_SONGID:
            const addComment = {...state}
            addComment[action.comment.id] = action.comment
            return addComment
        case DELETE_COMMENT_BY_USER:
            const deleteState = {...state}
            delete deleteState[action.commentId]
            return deleteState
        default:
            return state
    }
}

export default commentReducer