import React from 'react';
import style from './contextMenu.module.sass';
import Select from 'react-select'
import Actions from '../../../../messages/buttonsContainer/actions/actions';
import Controls from '../../../../messages/buttonsContainer/contextMenu/controls/controls';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import onClickOutside from "react-onclickoutside";
import {connect} from "react-redux";

const ContextMenu = (props) => {
    const {focusStatus, scenarioId} = props;
    const changedScenario = props.botScenarios.filter(elem => elem.id === scenarioId)[0];


    ContextMenu.handleClickOutside = () => focusStatus(false);


    const stylesForSelector = {
        control: (styles, state) => ({
            ...styles,
            boxShadow: '0 !important',
            cursor: 'pointer',
            '&:hover': {
                border: '2px solid #bdcadd !important'
            },
            border: '2px solid #bdcadd',
            borderRadius: '10px 0 0 10px',
            height: '100%',
            background: '#f1f3f5'
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                color: '#000',
                backgroundColor: isSelected ? '#f4f3f5' : 'white',
                cursor: 'pointer',
                borderRadius: '0'
            };
        }
    };

    const getTriggers = () => {
        const triggers = [];

        changedScenario.triggers.map(trigger =>
            triggers.push({
                value: trigger.id,
                label: trigger.caption
            })
        );

        return triggers;
    };

    console.log(changedScenario);

    return (
        <div className={style.mainContainer}>
            <div className={style.header}>
                Редактировать кнопку
            </div>
            <div className={style.buttonChanger}>
                <h2>Заголовок кнопки</h2>
                <input
                    type={'text'}
                    // defaultValue={buttonData.caption}
                    title={'title'}
                    // onInput={(e) => editButton(e, true)}
                />
                <div className={style.inputContainer}>
                    <Select
                        placeholder={'Триггер'}
                        options={getTriggers()}
                        // defaultValue={buttonData.payload.trigger_id && {
                        //     value: buttonData.payload.trigger_id,
                        //     label: changedTriggerInFastButton.caption
                        // }}
                        // onChange={(value) => editButton({
                        //     target: {
                        //         value: value.value
                        //     }
                        // })}
                        styles={stylesForSelector}
                        className={style.selector}
                        isSearchable={false}
                        components={{ DropdownIndicator:() => null }}
                        // arrowRenderer={() => ''}
                    />
                    <div
                        className={style.closeButton}
                        // onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                        //     caption: ''
                        // }), indexButton, true)}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                {/*<Actions*/}
                    {/*{...props}*/}
                {/*/>*/}
                {/*<Controls*/}
                    {/*{...props}*/}
                {/*/>*/}
            </div>
        </div>
    )


};

const mapStateToProps = state => {
    const {botScenarios} = state.singleBotReducers;

    return {
        botScenarios
    }
};

const clickOutsideConfig = {
    handleClickOutside: () => ContextMenu.handleClickOutside
};

export default onClickOutside(connect(mapStateToProps, null)(ContextMenu), clickOutsideConfig);
