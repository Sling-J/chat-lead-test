import React, {useState} from 'react';
import style from './typeProcessing.module.sass';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import ClickOutsideHandler from "../../hoc/clickOutside";
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import {connect} from "react-redux";


const TypeProcessing = (props) => {
    const [isOpenWindow, setStatusIsOpenWindow] = useState(false);
    const {type, index, value, changedTrigger} = props;

    const updateTrigger = (value) => {
        const messagesCopy = changedTrigger.messages;

        if(value < 60 && value > 0) {
            Object.assign(messagesCopy[props.changedSocial][index].type_processing, {
                delay: value
            });

            const triggerData = {
                ...changedTrigger,
                index,
                type,
                messages: messagesCopy,
                botId: props.match.params.botId
            };

            props.updateTrigger(triggerData, null, props.changedSocial);
        }

    };



    return (
        <div className={style.mainContentContainer}>
            <div className={style.hoverBar}>
                <HoverBarForMessage
                    {...props}
                    styleForBar={{top: '-25px', left: '320px'}}
                />
            </div>
            <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
                {
                    <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                        <div className={style.container}>
                            <div
                                className={style.timerContainer}
                                onClick={() => setStatusIsOpenWindow(true)}
                            >
                                Эффект печати { value.type_processing.delay || 0 } секунд
                            </div>
                            {
                                isOpenWindow && (
                                    <div className={style.messageContainer}>
                                        <div className={style.header}>
                                            Эффект печати
                                        </div>
                                        <div className={style.controlsContainer}>
                                            <label>Эффект печати:</label>
                                            <div className={style.inputContainer}>
                                                <input
                                                    type={'number'}
                                                    value={value.type_processing.delay}
                                                    onInput={(e) => updateTrigger(e.target.value)}
                                                />
                                                <div className={style.buttonSetTime} onClick={(e) => {
                                                    updateTrigger(+value.type_processing.delay + 1)
                                                }}>
                                                    <FontAwesomeIcon icon={faPlus}/>
                                                </div>
                                                <div className={style.buttonSetTime} onClick={(e) => {
                                                    updateTrigger(+value.type_processing.delay - 1)
                                                }}>
                                                    <FontAwesomeIcon icon={faMinus}/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }

                        </div>
                    </ClickOutsideHandler>
                }

            </div>
        </div>
    )
};


const mapStateToProps = state => {
    const {changedSocial} = state.singleBotReducers;

    return {
        changedSocial
    }
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TypeProcessing));