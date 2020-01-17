import ACTION from '../actions/actionTypes';

const initialState = {
	url: '',
	screenshot: '',
	logoutData: {},
	botSetupData: {},
	wpStatus: {},
   isFetching: false,
	setupLoading: false,
	loadingOfLogout: false,
	loadingOfStatus: false,
	loadingOfManager: false,
	loadingOfScreenshot: false,
	errorOfScreenshot: null,
	errorOfStatus: null,
	errorOfLogout: null,
   errorOfSocial: null,
   error: null
};

export default function (state = initialState, action) {
   switch (action.type) {
      case ACTION.RESET_BOTS_DATA:
         return {
            ...state,
            botSetupData: {},
            error: null
         };

      case ACTION.GET_BOT_SETUP_REQUEST:
         return {
            ...state,
            loadingOfManager: true,
            error: null
         };

      case ACTION.RESET_URL:
         return {
            ...state,
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
			
		case ACTION.GET_WP_SCREENSHOT_REQUEST:
			return {
				...state,
				loadingOfScreenshot: true,
				screenshot: '',
				errorOfScreenshot: null
			}

		case ACTION.CLOSE_WP_SCREENSHOT_REQUEST:
			return {
				...state,
				loadingOfScreenshot: false,
				screenshot: '',
				errorOfScreenshot: null
			};

		case ACTION.GET_WP_SCREENSHOT_SUCCESS:
			return {
				...state,
				loadingOfScreenshot: false,
				screenshot: action.payload,
				errorOfScreenshot: null
			};

		case ACTION.GET_WP_SCREENSHOT_FAILURE:
			return {
				...state,
				loadingOfScreenshot: false,
				screenshot: '',
				errorOfScreenshot: action.error
			};

		case ACTION.GET_WP_STATUS_REQUEST:
			return {
				...state,
				loadingOfStatus: true,
				wpStatus: {},
				errorOfStatus: null
			}

		case ACTION.GET_WP_STATUS_SUCCESS:
			return {
				...state,
				loadingOfStatus: false,
				wpStatus: action.payload,
				errorOfStatus: null
			}

		case ACTION.GET_WP_STATUS_FAILURE:
			return {
				...state,
				loadingOfStatus: false,
				wpStatus: {},
				errorOfStatus: action.error
			}

		case ACTION.LOGOUT_WP_STATUS_REQUEST:
			return {
				...state,
				logoutData: {},
				loadingOfLogout: true,
				errorOfLogout: null
			};

		case ACTION.LOGOUT_WP_STATUS_SUCCESS:
			return {
				...state,
				logoutData: action.payload,
				loadingOfLogout: false,
				errorOfLogout: null
			};

		case ACTION.LOGOUT_WP_STATUS_FAILURE:
			return {
				...state,
				logoutData: {},
				loadingOfLogout: false,
				errorOfLogout: action.error
			};

		case ACTION.BOT_SETUP_REQUEST: 
			return {
				...state,
				isFetching: true,
				error: null
			};
		
		case ACTION.BOT_SETUP_RESPONSE: 
			return {
				...state,
				botSetupData: action.data,
				loadingOfManager: false,
				isFetching: false,
				setupLoading: false,
				error: null
			};
		
		case ACTION.BOT_SETUP_ERROR: 
			return {
				...state,
				error: action.error,
				setupLoading: false,
				loadingOfManager: false,
				isFetching: false,
			};
		
      default:
			return state
   }
}
