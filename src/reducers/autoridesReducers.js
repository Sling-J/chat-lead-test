/* like mutation */
import ACTION from '../actions/actionTypes';

const initialState = {
    autoridesData: [],
    autoridesLinks: {},
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION.AUTORIDE_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION.AUTORIDE_RESPONSE: {
            return {
                ...state,
                autoridesData: action.autoridesData,
                autoridesLinks: action.autoridesLinks,
                isFetching: false,
                error: null
            }
        }
        case ACTION.AUTORIDE_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false
            }
        }
        default: {
            return state
        }
    }
}

