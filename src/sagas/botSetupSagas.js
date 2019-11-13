import { put, call, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
    getManager,
    editManager,
    getFacebookAuthUrl,
    getVkAuthUrl,
    getQRCodeUrl,
    getScenariesForManager,
    addNewScenario
} from "../api/rest/restContoller";
import {signUpErrors, authErrors} from "../constants/errors/user";
import {destinationScenario} from "../constants/defaultValues";


export function* getManagerSaga({ idBot }){

    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', idBot);

        const {data} = yield call(getManager, formData);
        /* data =
        {   'ok': True,
            'manager':
            {
                'id': 44, 'name': '123', 'amocrm_domain': '',
                'bitrix_key': '', 'bitrix_domain': '', 'application_email': '',
                'application_whatsapp_id': '', 'facebook_token': '', 'facebook_group_id': '',
                'telegram_token': '', 'vk_group_id': '', 'vk_group_access_token': '',
                'whatsapp_token': '', 'whatsapp_instance': '', 'welcome_message': '',
                'default_response': '', 'facebook_name': '', 'vk_name': '',
                'telegram_name': '', 'whatsapp_status': ''
            }
        }
        */

        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.manager});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* editManagerSaga({ setupData }){
    if(localStorage.getItem('token')) {
        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', setupData.idBot);

        if (setupData.optional_params !== undefined) {
            for (let param of setupData.optional_params) {
                formData.append(param, setupData[param]);
            }
        }

      //   console.log(setupData);

		  const {data} = yield call(editManager, formData);

        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.manager});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* facebookAuthSaga({ idBot }){
    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', idBot);

        const {data} = yield call(getFacebookAuthUrl, formData);

        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.url});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* vkAuthSaga({ idBot }){
    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', idBot);

        const {data} = yield call(getVkAuthUrl, formData);
        console.log(data);
        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.url});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* getQRCodeSaga({ idBot }){
    if(localStorage.getItem('token')) {
        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', idBot);

        const {data} = yield call(getQRCodeUrl, formData);

        if(data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.url});
        }else {
            yield put({ type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc] })
        }
    }
}

export function* updateBotReactionsSaga({ reactionsData }){
    if(localStorage.getItem('token')) {

        yield put({ type: ACTION.BOT_SETUP_REQUEST});

        const formData = new FormData();
        formData.append('user_token', localStorage.getItem('token'));
        formData.append('manager_id', reactionsData.botId);

        const allScenarios = yield call(getScenariesForManager, formData);
        if(allScenarios.data.ok) {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenarios.data.scenarios});
        }else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: allScenarios.data.desc})
        }

        const scenarioForBotReaction
            = allScenarios.data.scenarios.filter(elem => elem.destination === reactionsData.typeReaction);

        if(scenarioForBotReaction.length > 0) {

            if(reactionsData.statusChecked) {
                // -- Sending type reaction with the scenario prefix
                formData.append(reactionsData.typeReaction, `scenario: ${scenarioForBotReaction[0].id}`);
                const {data} = yield call(editManager, formData);
                if(data.ok) {
                    yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: scenarioForBotReaction[0].id})
                }

            }else {
                // console.log(">>>");
                formData.append(reactionsData.typeReaction, null);
                const {data} = yield call(editManager, formData);
            }

        }else {
            formData.append(
                'trigger_text',
                reactionsData.typeReaction === destinationScenario.welcome_message ?
                    'Сценарий для приветствия' : 'Сценарий для неизвестной команды'
            );
            formData.append('destination', reactionsData.typeReaction);
            const {data} = yield call(addNewScenario, formData);

            if(data.ok) {
                const newArrayScenarios = allScenarios.data.scenarios;
                newArrayScenarios.push(data.scenario);
                yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: newArrayScenarios});

                if(reactionsData.statusChecked) {
                    // -- Sending type reaction with the scenario prefix
                    formData.append(reactionsData.typeReaction, `scenario: ${data.scenario.id}`);
                    const statusEdit = yield call(editManager, formData);
                    yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: data.scenario.id})
                }
            }

        }

        const managerOptions = yield call(getManager, formData);

        if(managerOptions.data.ok) {
            yield put({type: ACTION.BOT_SETUP_RESPONSE, data: managerOptions.data.manager});

        }
    }
}
