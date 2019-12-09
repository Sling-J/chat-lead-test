import ACTION from '../actions/actionTypes';

const initialState = {
   url: '',
   botSetupData: {},
   isFetching: false,
   setupLoading: false,
   errorOfSocial: null,
   error: null
};

export default function (state = initialState, action) {
   switch (action.type) {
      case ACTION.RESET_URL:
         return {
            setupLoading: false,
            errorOfSocial: null,
            url: ''
         };

      case ACTION.GET_FACEBOOK_AUTH_URL_REQUEST:
      case ACTION.GET_VK_AUTH_URL_REQUEST:
      case ACTION.GET_WA_QR_URL_REQUEST:
         return {
            ...state,
            setupLoading: true,
            errorOfSocial: null,
            url: ''
         };

      case ACTION.GET_FACEBOOK_AUTH_URL_SUCCESS:
      case ACTION.GET_VK_AUTH_URL_SUCCESS:
      case ACTION.GET_WA_QR_URL_SUCCESS:
         return {
            ...state,
            setupLoading: false,
            url: action.payload,
            errorOfSocial: null
         };

      case ACTION.GET_FACEBOOK_AUTH_URL_FAILURE:
      case ACTION.GET_VK_AUTH_URL_FAILURE:
      case ACTION.GET_WA_QR_URL_FAILURE:
         return {
            ...state,
            setupLoading: false,
            url: '',
            errorOfSocial: action.error
         };

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
            setupLoading: false,
            error: null
         }
      }
      case ACTION.BOT_SETUP_ERROR: {
         return {
            ...state,
            error: action.error,
            setupLoading: false,
            isFetching: false
         }
      }
      default: {
         return state
      }
   }
}
