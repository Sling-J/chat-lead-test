/* like mutation */
import ACTION from '../actions/actionTypes';

const initialState = {
   botScenarios: [],
   scenariosForScenarioContainer: [],
   changedScenarioId: null,
   changedSocial: 'facebook',
   createdTriggerId: null,
   isFetching: false,
   loadingOfScenarios: false,
   loadingOfTrigger: false,
   error: null
};

export default function (state = initialState, action) {
   switch (action.type) {
      case ACTION.RESET_BOTS_DATA:
         return {
            ...state,
            scenariosForScenarioContainer: [],
            botScenarios: [],
            error: null,
         };

      case ACTION.GET_ALL_SCENARIOS_REQUEST:
         return {
            ...state,
            loadingOfScenarios: true,
            error: null
         };

      case ACTION.EDIT_TRIGGER_REQUEST:
         return {
            ...state,
            loadingOfTrigger: true,
            error: null,
         };

      case ACTION.SINGLE_BOT_DATA_REQUEST: {
         return {
            ...state,
            isFetching: true,
            error: null
         }
      }

      case ACTION.SINGLE_BOT_DATA_RESPONSE: {
         const scenariosForScenarioContainer = action.dataScenarios.filter(elem => elem.destination === 'undefined');

         return {
            ...state,
            botScenarios: action.dataScenarios,
            scenariosForScenarioContainer: scenariosForScenarioContainer,
            loadingOfScenarios: false,
            loadingOfTrigger: false,
            isFetching: false,
            error: null
         }
      }

      case ACTION.CHANGE_SCENARIO_ID: {
         return {
            ...state,
            changedScenarioId: action.scenarioId
         }
      }

      case ACTION.CHANGE_SOCIAL: {
         return {
            ...state,
            changedSocial: action.social
         }
      }

      case ACTION.SINGLE_BOT_DATA_ERROR: {
         return {
            ...state,
            error: action.error,
            loadingOfScenarios: false,
            loadingOfTrigger: false,
            isFetching: false
         }
      }

      case ACTION.ADD_NEW_TRIGGER_SUCCESS:
         return {
            ...state,
            createdTriggerId: action.payload
         };

      default: {
         return state
      }
   }
}

