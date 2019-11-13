import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import style from './triggersContainer.module.sass';
import {addNewTrigger, getAllScenariesForBot, updateTrigger, editScenario} from "../../../actions/actionCreator";
import {connect} from 'react-redux';
import {fileDefinition} from "../../../utils/fileDefinition/fileDefinition";
import ButtonsForAddNewMessage from '../../inputs/buttons/buttonsForAddNewMessages/buttonsForAddNewMessage';
import SideBarSocial from '../../sideBarSocial/sideBarSocial';
import MessagesContainer from './messagesContainer/messagesContainer';
import BroadCastMenu from '../../broadCastContainer/broadCastMenu/broadCastMenu';
import {destinationScenario} from "../../../constants/defaultValues";
import leftArrow from "../../../svg/db/left-arrow.svg";
import Triggers from './triggers/triggers';
import FastButtons from './fastButtons/fastButtons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClone} from "@fortawesome/free-regular-svg-icons";


const TriggersContainer = (props) => {
    const changedScenario = props.botScenarios.filter(elem => elem.id === props.scenarioId)[0];
    // const {triggers} = changedScenario;
    const triggers = changedScenario && changedScenario.triggers;
    const triggerText = changedScenario && changedScenario.trigger_text;
    const [triggerTextInputLength, setTriggerTextInputLength] = useState(false);
    const [changedTriggerId, changeTriggerId] = useState(triggers && triggers[0].id);
    const changedTrigger = triggers && triggers.filter(elem => elem.id === changedTriggerId)[0];
    const activeStep = changedScenario && changedScenario.triggers.find(el => el.id === changedTriggerId);

    useEffect(() => {
        if(triggers && triggers.length === 1) {
            changeTriggerId(triggers[0].id)
        }
    }, [triggers]);

    // console.log(props.broadCastId);


    console.log(triggerTextInputLength, '>>>');

    const newTriggerHandler = () => {
        const triggerData = {
          scenario_id: changedScenario.id,
          manager_id: props.match.params.botId,
        };

        props.appendTrigger(triggerData);
    };


    const updateTriggerDeleteMessageHandler = (index) => {
        console.log(index);
    };

    const updateTriggerUpdateMessageHandler = (e, index, typeFile) => {

        const messagesCopy = changedTrigger.messages;


        const updationData = {
            type: typeFile,
        };
        if(typeFile === 'text') {
            Object.assign(updationData, { text: e.target.value })
        }else {
            Object.assign(updationData, { file: e.target.files[0] })
        }

        const updatedTrigger = {
            ...changedTrigger,
            index: index,
            messages: messagesCopy,
            botId: props.match.params.botId
        };
        props.updateTrigger(updatedTrigger, updationData, props.changedSocial);

    };

    const changeTriggerText = (e) => {
        props.editScenario({
            botId: props.match.params.botId,
            scenarioId: changedScenario.id,
            trigger_text: e.target.value
        });
        setTriggerTextInputLength(false);
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.sideContainer}>
                <div className={style.buttonsContainer}>
                    <div className={style.before} onClick={() => props.changeScenarioId(false)}>
                        <img src={leftArrow} alt={'back'}/>
                        Назад к списку
                    </div>
                    <div className={style.next} onClick={() => props.changeScenarioId(false)}>
                        Сохранить
                    </div>
                </div>
                <div
                    className={style.saveDataStatus}
                >
                    {props.isFetching ? 'Идет сохранение' : 'Ваши данные сохранены!'}
                </div>
                <Triggers
                    changeTriggerId={changeTriggerId}
                    changedScenario={changedScenario}
                    changedTriggerId={changedTriggerId}
                />

                {/*{*/}
                    {/*changedScenario && changedScenario.triggers.map(trigger => (*/}
                        {/*<div*/}
                            {/*className={style.singleTriggerContainer}*/}
                            {/*onClick={() => changeTriggerId(trigger.id)}*/}
                        {/*>*/}
                            {/*<div*/}
                                {/*style={trigger.id === changedTriggerId*/}
                                    {/*? {border: '1px solid #13ce66', color: '#13ce66'} : {}}*/}
                                {/*className={style.triggerElement}*/}
                            {/*>*/}
                                {/*{trigger.caption}*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*))*/}
                {/*}*/}
                <div onClick={newTriggerHandler} className={style.newTriggerContainer}>+ Новый триггер</div>
            </div>
            <div className={style.triggerConstructor}>
                <div className={style.contentContainer}>
                    {
                        // changedScenario && (
                           <>
                               <div
                                   className={style.contentHeader}
                                   onDoubleClick={() => setTriggerTextInputLength(triggerText.length)}
                               >
                                   {
                                       triggerTextInputLength ?
                                           <input
                                               type={'text'}
                                               autoFocus={true}
                                               onBlur={changeTriggerText}
                                               defaultValue={triggerText}
                                               style={{width: `${triggerTextInputLength || 1}em`}}
                                               onKeyDown={(e) => setTriggerTextInputLength(e.target.value.length || 1)}
                                           /> :
                                           <p>{activeStep && activeStep.caption}</p>
                                   }
                               </div>
                               {
                                   changedTrigger && (
                                       <>
                                           <MessagesContainer
                                               changedTrigger={changedTrigger}
                                               updateTriggerUpdateMessageHandler={updateTriggerUpdateMessageHandler}
                                               updateTriggerDeleteMessageHandler={updateTriggerDeleteMessageHandler}
                                           />
                                           <FastButtons
                                               changedTrigger={changedTrigger}
                                           />
                                           <div className={style.controls}>
                                               <ButtonsForAddNewMessage
                                                   changedTrigger={changedTrigger}
                                               />
                                           </div>
                                       </>
                                   )
                               }

                           </>
                        // )
                    }
                    <div className={style.broadCastMenu}>
                        {
                            changedScenario && changedScenario.destination === destinationScenario.broadcast && (
                                <BroadCastMenu
                                    broadCastId={props.broadCastId}
                                    changedTrigger={changedTrigger}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={style.social}>
                {/*{*/}
                    {/*console.log(props.autoridesLinks)*/}
                {/*}*/}
                <div className={style.linkContainer}>
                    {
                        props.autoridesLinks && (
                            <>
                                <div className={style.autorideLink}>
                                    <a
                                        href={props.autoridesLinks[props.changedSocial]}
                                    >
                                        {
                                            props.autoridesLinks[props.changedSocial].length && (
                                                props.autoridesLinks[props.changedSocial].length > 28 ?
                                                    `${props.autoridesLinks[props.changedSocial].slice(0, 28)}...` :
                                                    props.autoridesLinks[props.changedSocial]
                                            )
                                        }
                                    </a>
                                </div>

                                <div className={style.linkButton} onClick={() => {
                                    navigator.clipboard.writeText(props.autoridesLinks[props.changedSocial])
                                }}>
                                    <p><FontAwesomeIcon icon={faClone}/></p>
                                    Копировать ссылку
                                </div>
                            </>
                        )
                    }

                </div>
                <SideBarSocial
                    changedTrigger={changedTrigger}
                />
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {botScenarios, isFetching, error, changedSocial} = state.singleBotReducers;
    const {botsData} = state.botsReducers;
    // const {autoridesLinks} = state.autoridesReducers;
    // const {isFetching} = state.

    return {
        botScenarios, isFetching, error, botsData, changedSocial
    }
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData, changedSocial) => dispatch(updateTrigger(triggerData, updationData, changedSocial)),
    appendTrigger: (triggerData) => dispatch(addNewTrigger(triggerData)),
    editScenario: (scenarioData) => dispatch(editScenario(scenarioData))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TriggersContainer));
