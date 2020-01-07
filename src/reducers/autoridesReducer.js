import ACTION from '../actions/actionTypes';

const initialState = {
   autoridesData: [],
   autoridesLinks: {},
   loadingOfAutoRides: false,
   isFetching: false,
   error: null
};

export default function (state = initialState, action) {
   switch (action.type) {
      case ACTION.RESET_BOTS_DATA:
         return {
            ...state,
            autoridesData: [],
            error: null
         };

      case ACTION.GET_AUTORIDE_REQUEST:
         return {
            ...state,
            loadingOfAutoRides: true,
            error: null
         };

      case ACTION.AUTORIDE_REQUEST:
         return {
            ...state,
            isFetching: true,
            error: null
         };

      case ACTION.AUTORIDE_RESPONSE:
         return {
            ...state,
            autoridesData: action.autoridesData,
            autoridesLinks: action.autoridesLinks,
            loadingOfAutoRides: false,
            isFetching: false,
            error: null
         };

      case ACTION.AUTORIDE_ERROR:
         return {
            ...state,
            error: action.error,
            loadingOfAutoRides: false,
            isFetching: false
         };
      default:
         return state
   }
}

