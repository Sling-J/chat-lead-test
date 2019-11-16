import React, {useState} from 'react';
import style from './fastButtons.module.sass';
import ContextMenu from './contextMenu/contextMenu';
import {updateTrigger} from "../../../../actions/actionCreator";
import {connect} from 'react-redux';
import {ScenarioIdContext} from "../../../../utils/Contexts";
import {buttonsTypes} from "../../../../constants/defaultValues";
import {withRouter} from "react-router-dom";

const FastButtons = (props) => {
    const [indexOpenButton, setIndexOpenButton] = useState(false);

    const {
        type,
        index,
        changedTrigger,
        changedSlideOrElement,
        styleForButton,
        styleForContextMenu
    } = props;

    const appendFastButton = () => {
        const messagesCopy = changedTrigger.messages;
        let buttons = null;

        if (changedSlideOrElement || changedSlideOrElement === 0) {
            buttons = messagesCopy[props.changedSocial][index][type][changedSlideOrElement].keyboard;
        } else {
            buttons = messagesCopy[props.changedSocial][index].keyboard;
        }

        buttons.push({
            caption: 'Новая Кнопка',
            isEmpty: true,
            type: buttonsTypes.fast_buttons,
            payload: {
                trigger_id: changedTrigger.id
            },
        });

        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData, null, props.changedSocial);
    };

    const editButton = (typeButton, buttonData, indexButton, isEmpty) => {
        const messagesCopy = changedTrigger.messages;
        const buttonsValues = allFastButtonsInMessage();

        Object.assign(buttonsValues[indexButton], buttonData, {
            isEmpty: isEmpty || false,
            type: typeButton
        });

        messagesCopy[props.changedSocial][index].keyboard = buttonsValues;

        const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
        };

        props.updateTrigger(triggerData, null, props.changedSocial);
    };

    const allFastButtonsInMessage = () => {
        const messagesCopy = changedTrigger.messages;
        const buttonsArray = changedSlideOrElement || changedSlideOrElement === 0 ?
            messagesCopy[props.changedSocial][index][type][changedSlideOrElement].keyboard
            : messagesCopy[props.changedSocial][index].keyboard;


        return buttonsArray.filter(button => button.type === buttonsTypes.fast_buttons);
    };

    return (
        <div className={style.mainContainer}>
            {allFastButtonsInMessage().map((elem, indexArr) => (
                <div onClick={() => setIndexOpenButton(indexArr)}>
                    <div className={style.contextMenuContainer}>
                        {indexOpenButton === indexArr && (
                            <ScenarioIdContext.Consumer>
                                {scenarioId => (
                                    <ContextMenu
                                        buttonEditHandler={editButton}
                                        typeButton={elem.type}
                                        scenarioId={scenarioId}
                                        indexButton={indexArr}
                                        buttonData={elem}
                                        setIndexOpenButton={setIndexOpenButton}
                                        changedTrigger={changedTrigger}
                                        styleForContextMenu={styleForContextMenu}
                                        index={index}
                                    />
                                )}
                            </ScenarioIdContext.Consumer>
                        )}
                    </div>
                    <div style={styleForButton}>
                        <div className={style.newFastButton}>
                            {elem.caption || 'Быстрый ответ'}
                        </div>
                    </div>
                </div>
            ))}

            {changedSlideOrElement || changedSlideOrElement === 0 ?
                allFastButtonsInMessage().length === 0 && (
                    <button onClick={appendFastButton}>
                        Apend fast button
                    </button>
                )
                :
                allFastButtonsInMessage().length < 4 && (
                    <button onClick={appendFastButton}>
                        Apend fast button
                    </button>
                )
            }

            {/*{*/}
            {/*    isFocusInNewButton ?*/}
            {/*        (*/}
            {/*            <div className={style.inputContainer}>*/}
            {/*                <input*/}
            {/*                    className={style.openNewFastButton}*/}
            {/*                    type={'text'}*/}
            {/*                    autoFocus={true}*/}
            {/*                    placeholder={'Название'}*/}
            {/*                    // onBlur={() => focusInNewButton(false)}*/}
            {/*                />*/}
            {/*                <div className={style.contextMenuContainer}>*/}

            {/*                    <ScenarioIdContext.Consumer>*/}
            {/*                        {scenarioId => (*/}
            {/*                            <ContextMenu*/}
            {/*                                scenarioId={scenarioId}*/}
            {/*                            />*/}
            {/*                        )}*/}
            {/*                    </ScenarioIdContext.Consumer>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ) : (*/}
            {/*            <div*/}
            {/*                className={style.newFastButton}*/}
            {/*            >*/}
            {/*                + Быстрый ответ*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*}*/}
        </div>
    )
};

const mapStateToProps = ({singleBotReducers}) => ({
    changedSocial: singleBotReducers.changedSocial
});


const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData, changedSocial) => dispatch(updateTrigger(triggerData, updationData, changedSocial)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FastButtons));
