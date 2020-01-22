import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

import {updateTrigger} from "../../../actions/actionCreator";
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import ClickOutsideHandler from "../../hoc/clickOutside";

import style from './typeProcessing.module.sass';
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";

const TypeProcessing = (props) => {
   const [isOpenWindow, setStatusIsOpenWindow] = useState(false);
   const {type, index, value, changedTrigger} = props;

   const updateTrigger = (value) => {
      const messagesCopy = changedTrigger.messages;

      if (value < 60 && value > 0) {
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
         <ConditionsToggle isOpenConditions={value.conditions} {...props}/>
         <ConditionsContainer conditions={value.conditions}/>

         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>
         <div className={`${style.mainContainer} ${value.conditions && style.typeRadius}`} onClick={() => setStatusIsOpenWindow(true)}>
            {
               <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                  <div className={style.container}>
                     <div
                        className={style.timerContainer}
                        onClick={() => setStatusIsOpenWindow(true)}
                     >
                        Эффект печати {value.type_processing.delay || 0} секунд
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
                                    <div className={style.buttonSetTime} onClick={() => {
                                       updateTrigger(+value.type_processing.delay + 1)
                                    }}>
                                       <FontAwesomeIcon icon={faPlus}/>
                                    </div>
                                    <div className={style.buttonSetTime} onClick={() => {
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

const mapStateToProps = ({singleBotReducers}) => ({
	changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(TypeProcessing);
