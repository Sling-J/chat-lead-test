import ACTION from '../actions/actionTypes';

const initialState = {
   payment: {},
   transactions: [],
   loadingOfPayment: false,
   loadingOfTransactions: false,
   errorOfPayment: null,
   errorOfOfTransactions: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case ACTION.ADD_PAYMENT_REQUEST:
         return {
            ...state,
            payment: {},
            loadingOfPayment: true,
            errorOfPayment: null
         };

      case ACTION.ADD_PAYMENT_SUCCESS:
         return {
            ...state,
            payment: action.payload,
            loadingOfPayment: false,
            errorOfPayment: null
         };

      case ACTION.ADD_PAYMENT_FAILURE:
         return {
            ...state,
            payment: {},
            loadingOfPayment: false,
            errorOfPayment: action.error
         };

      case ACTION.GET_TRANSACTIONS_REQUEST:
         return {
            ...state,
            transactions: [],
            loadingOfTransactions: true,
            errorOfOfTransactions: null
         };

      case ACTION.GET_TRANSACTIONS_SUCCESS:
         return {
            ...state,
            transactions: action.payload,
            loadingOfTransactions: false,
            errorOfOfTransactions: null
         };

      case ACTION.GET_TRANSACTIONS_FAILURE:
         return {
            ...state,
            transactions: [],
            loadingOfTransactions: false,
            errorOfOfTransactions: action.error
         };

      default:
         return state;
   }
};
