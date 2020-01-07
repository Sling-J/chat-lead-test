import ACTION from '../actions/actionTypes';

const initialState = {
   broadCastData: [],
   loadingOfBroadCasts: false,
   isFetching: false,
   error: null
};

export default function (state = initialState, action) {
   switch (action.type) {
      case ACTION.RESET_BOTS_DATA:
         return {
            ...state,
            broadCastData: [],
            error: null,
         };

      case ACTION.GET_ALL_BROADCASTS_REQUEST:
         return {
            ...state,
            broadCastData: [],
            loadingOfBroadCasts: true,
            error: null,
         };

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
            loadingOfBroadCasts: false,
            isFetching: false,
            error: null
         }
      }
      case ACTION.BROADCAST_ERROR: {
         return {
            ...state,
            error: action.error,
            loadingOfBroadCasts: false,
            isFetching: false
         }
      }
      default: {
         return state
      }
   }
}

