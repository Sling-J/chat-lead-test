import React from 'react';
import style from './editContainer.module.sass';
import onClickOutside from "react-onclickoutside";
import {connect} from "react-redux";



const EditContainer = (props) => {
    const {setTriggerIdEdit} = props;

    EditContainer.handleClickOutside = () => setTriggerIdEdit(false);

    return (
        <div className={style.mainContainer}>
            edit
        </div>
    )
};

const clickOutsideConfig = {
    handleClickOutside: () => EditContainer.handleClickOutside
};

export default onClickOutside(connect(null)(EditContainer), clickOutsideConfig);