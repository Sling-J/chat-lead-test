/* like mutation */
import ACTION from '../actions/actionTypes';

const initialState = {
    botsData: [],
    changedBotData: {},
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ACTION.BOTS_DATA_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION.BOTS_DATA_RESPONSE: {
            return {
                ...state,
                botsData: action.data,
                changedBotData: action.changedBotData,
                isFetching: false,
                error: null
            }
        }
        case ACTION.BOTS_DATA_ERROR: {
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

