import ACTION from '../actions/actionTypes';

const initialState = {
   statistics: {},
   loadingOfStatistics: false,
	errorOfStatistics: null,

	exportedUsers: {},
	loadingOfExport: false,
	errorOfExport: null,

   importedUsers: {},
   loadingOfImport: false,
   errorOfImport: null,
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

		case ACTION.EXPORT_USERS_REQUEST:
			return {
				...state,
				exportedUsers: {},
				loadingOfExport: true,
				errorOfExport: null,
			};

		case ACTION.EXPORT_USERS_SUCCESS:
			return {
				...state,
				exportedUsers: action.payload,
				loadingOfExport: false,
				errorOfExport: null,
			};

		case ACTION.EXPORT_USERS_FAILURE:
			return {
				...state,
				exportedUsers: {},
				loadingOfExport: false,
				errorOfExport: action.error,
			};

      case ACTION.IMPORT_USERS_REQUEST:
         return {
            ...state,
            importedUsers: {},
            loadingOfImport: true,
            errorOfImport: action.error,
         };

      case ACTION.IMPORT_USERS_SUCCESS:
         return {
            ...state,
            importedUsers: action.payload,
            loadingOfImport: false,
            errorOfImport: null,
         };

      case ACTION.IMPORT_USERS_FAILURE:
         return {
            ...state,
            importedUsers: {},
            loadingOfImport: false,
            errorOfImport: action.error,
         };

		case ACTION.RESET_EXPORTED_USERS:
			return {
				...state,
				exportedUsers: {},
				loadingOfExport: false,
				errorOfExport: null,
			};

      default:
         return state;
   }
};
