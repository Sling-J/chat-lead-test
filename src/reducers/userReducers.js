/* like mutation */
import ACTION from '../actions/actionTypes';

const initialState = {
    userData: {},
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION.USER_DATA_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION.USER_DATA_RESPONSE: {
            return {
                ...state,
                userData: action.data,
                isFetching: false,
                error: null
            }
        }
        case ACTION.USER_DATA_ERROR: {
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

