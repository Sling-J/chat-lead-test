import ACTION from '../actions/actionTypes';

const initialState = {
   payment: [],
   loadingOfPayment: false,
   errorOfPayment: null
};

export default (state = initialState, action) => {
   switch (action.type) {
      case ACTION.GET_BOT_STATISTICS_REQUEST:
         return {
            ...state,
            payment: {},
            loadingOfPayment: true,
            errorOfPayment: null
         };

      case ACTION.GET_BOT_STATISTICS_SUCCESS:
         return {
            ...state,
            payment: action.payload,
            loadingOfPayment: false,
            errorOfPayment: null
         };

      case ACTION.GET_BOT_STATISTICS_FAILURE:
         return {
            ...state,
            payment: {},
            loadingOfPayment: false,
            errorOfPayment: action.error
         };

      default:
         return {
            payment: {},
            loadingOfPayment: false,
            errorOfPayment: null
         };
   }
};
