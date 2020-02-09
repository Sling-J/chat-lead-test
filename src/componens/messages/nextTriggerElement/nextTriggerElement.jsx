import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";
import {updateTrigger} from "../../../actions/actionCreator";

import {Select} from 'antd';

import style from './nextTriggerElement.module.scss';

const {Option} = Select;

const NextTriggerElement = props => {
   const {
      value, changedScenario, changedTrigger,
      changedSocial, match, index, type
   } = props;

   const updateTrigger = triggerId => {
      const messagesCopy = changedTrigger.messages;
      const nextTrigger = messagesCopy[changedSocial][index];

      nextTrigger.nextTrigger.trigger_id = triggerId;

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: match.params.botId
      };

      props.updateTrigger(triggerData, null, changedSocial);
   };

   const defaultValue = value.nextTrigger.trigger_id.length !== 0 ? value.nextTrigger.trigger_id : undefined;
   const filteredTriggers = changedScenario.triggers.filter(trigger => trigger.id !== changedTrigger.id);

   return (
      <div className={style.mainContainer}>
         <ConditionsToggle isOpenConditions={value.conditions} {...props}/>
         <ConditionsContainer conditions={value.conditions} {...props}/>

         <div className={style.hoverBar}>
            <HoverBarForMessage {...props}/>
         </div>

         <div className={`${style.nextTriggerContainer} ${value.conditions && style.nextTriggerRadius}`}>
            <p>Переход к существующему шагу</p>

            <Select
               showSearch
               className={style.nextTriggerSelection}
               style={{width: "100%"}}
               defaultValue={defaultValue}
               optionFilterProp="children"
               onChange={updateTrigger}
               placeholder="Выберите шаг для перехода"
               filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
               }
            >
               {filteredTriggers.map(trigger => (
                  <Option value={trigger.id}>{trigger.caption}</Option>
               ))}
            </Select>
         </div>
      </div>
   );
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
)(NextTriggerElement);