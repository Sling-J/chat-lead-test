import ACTION from '../actions/actionTypes';

const initialState = {
    botSetupData: {},
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.BOT_SETUP_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION.BOT_SETUP_RESPONSE: {
            return {
                ...state,
                botSetupData: action.data,
                isFetching: false,
                error: null
            }
        }
        case ACTION.BOT_SETUP_ERROR: {
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