import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faLink, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

export const markForButton = {
    text_buttons: <FontAwesomeIcon icon={faAngleRight}/>,
    url_buttons: <FontAwesomeIcon icon={faLink}/>,
    trigger_buttons: <FontAwesomeIcon icon={faAngleRight}/>,
    call_buttons: <FontAwesomeIcon icon={faPhoneAlt}/> 
};