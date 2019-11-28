import React from 'react';
import style from './contextMenuForEditScenario.module.sass';
import onClickOutside from "react-onclickoutside";
import {connect} from "react-redux";

const ContextMenuForEditScenario = (props) => {
   const {setIdEditTriggerText, onInput, defaultValue} = props;

   ContextMenuForEditScenario.handleClickOutside = () => setIdEditTriggerText(false);

   return (
      <div className={style.editScenario}>
         <h2>Введите ключевое слово</h2>
         <input
            defaultValue={defaultValue}
            onInput={onInput}
            maxLength={10}
         />
      </div>
   )
};

const clickOutsideConfig = {
   handleClickOutside: () => ContextMenuForEditScenario.handleClickOutside
};

export default onClickOutside(connect(null)(ContextMenuForEditScenario), clickOutsideConfig);