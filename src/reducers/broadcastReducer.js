import ACTION from '../actions/actionTypes';

const initialState = {
   broadCastData: [],
   isFetching: false,
   error: null
};

export default function (state = initialState, action) {
   switch (action.type) {
      case ACTION.UPDATE_BROADCAST:
      case ACTION.BROADCAST_REQUEST: {
         return {
            ...state,
            isFetching: true,
            broadCastData: [],
            error: null
         }
      }
      case ACTION.BROADCAST_RESPONSE: {
         return {
            ...state,
            broadCastData: action.broadCastData,
            isFetching: false,
            error: null
         }
      }
      case ACTION.BROADCAST_ERROR: {
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

