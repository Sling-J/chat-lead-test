import React, {useState} from 'react';
import style from './fastButtons.module.sass';
import ContextMenu from './contextMenu/contextMenu';
import {updateTrigger} from "../../../../actions/actionCreator";
import {connect} from 'react-redux';
import {ScenarioIdContext} from "../../../../utils/Contexts";
import {buttonsTypes} from "../../../../constants/defaultValues";

const FastButtons = (props) => {
    const [isFocusInNewButton, focusInNewButton] = useState(false);

    const {
        type,
        index,
        value,
        changedTrigger,
        changedSlideOrElement,
        styleForControls,
        styleForButton,
        styleForCaption,
        styleForContextMenu
    } = props;

    const appendNewButton = () => {
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
            type: buttonsTypes.fast_buttons
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

    // console.log(Object.keys(props.changedTrigger.keyboard));
    //
    // const editButton = (typeButton, buttonData, indexButton, isEmpty) => {
    //     const messagesCopy = changedTrigger.messages;
    //     const buttonsValues = allButtonsInMessage();
    //
    //     Object.assign(buttonsValues[indexButton], buttonData, {
    //         isEmpty: isEmpty || false,
    //         type: typeButton
    //     });
    //
    //     messagesCopy[props.changedSocial][index].keyboard = buttonsValues;
    //
    //     const triggerData = {
    //         ...changedTrigger,
    //         index,
    //         type,
    //         messages: messagesCopy,
    //         botId: props.match.params.botId
    //     };
    //
    //     console.log(buttonData);
    //
    //     props.updateTrigger(triggerData, null, props.changedSocial);
    // };

    return (
        <div className={style.mainContainer}>

            {
                isFocusInNewButton ?
                    (
                        <div className={style.inputContainer}>
                            <input
                                className={style.openNewFastButton}
                                type={'text'}
                                autoFocus={true}
                                placeholder={'Название'}
                                // onBlur={() => focusInNewButton(false)}
                            />
                            <div className={style.contextMenuContainer}>

                                <ScenarioIdContext.Consumer>
                                    {scenarioId => (
                                        <ContextMenu
                                            scenarioId={scenarioId}
                                            focusStatus={focusInNewButton}
                                        />
                                    )}
                                </ScenarioIdContext.Consumer>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={style.newFastButton}
                            onClick={() => isFocusInNewButton()}
                        >
                            + Быстрый ответ
                        </div>
                    )
            }

        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData, changedSocial) => dispatch(updateTrigger(triggerData, updationData, changedSocial)),
});

export default connect(null, mapDispatchToProps)(FastButtons);
