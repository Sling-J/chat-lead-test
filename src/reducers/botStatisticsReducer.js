import ACTION from '../actions/actionTypes';

const initialState = {
   statistics: {},
   loadingOfStatistics: false,
   errorOfStatistics: null
};

export default (state = initialState, action) => {
   switch (action.type) {
      case ACTION.GET_BOT_STATISTICS_REQUEST:
         return {
            ...state,
            statistics: {},
            loadingOfStatistics: true,
            errorOfStatistics: null
         };

      case ACTION.GET_BOT_STATISTICS_SUCCESS:
         return {
            ...state,
            statistics: action.payload,
            loadingOfStatistics: false,
            errorOfStatistics: null
         };

      case ACTION.GET_BOT_STATISTICS_FAILURE:
         return {
            ...state,
            statistics: {},
            loadingOfStatistics: false,
            errorOfStatistics: action.error
         };

      default:
         return state;
   }
};
