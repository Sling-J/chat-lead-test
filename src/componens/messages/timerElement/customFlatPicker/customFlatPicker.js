import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import flatpickr from "flatpickr";

import {Russian} from "flatpickr/dist/l10n/ru.js"
import {flatDateTimerFormat} from "../../../../utils/formatDate";

import style from './customFlatPicker.module.sass'
import "flatpickr/dist/themes/material_blue.css";

export default class CustomFlatPicker extends Component {
   constructor(props) {
      super(props);
      this.ref = React.createRef();
   }

   componentDidMount() {
      flatpickr(this.ref.current, {
         defaultDate: this.props.defaultValue,
         onChange: this.props.onChange,
         enableTime: true,
         time_24hr: true,
         minDate: "today",
         locale: Russian,
         dateFormat: flatDateTimerFormat,
      });
   }

   render() {
      const {defaultValue, styleForPicker} = this.props;

      return (
         <div className={style.flatPickerContainer} style={styleForPicker} ref={this.ref}>
            <p>{defaultValue}</p>
            <p>
               <FontAwesomeIcon icon={faChevronDown}/>
            </p>
         </div>
      );
   }
}
