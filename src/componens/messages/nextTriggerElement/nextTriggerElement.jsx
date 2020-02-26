import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";

import {getAllAutorides, updateTrigger} from "../../../actions/actionCreator";
import {destinationScenario} from "../../../constants/defaultValues";

import {Select, Radio} from 'antd';

import style from './nextTriggerElement.module.scss';
import {sliceExtraText} from "../../../utils/textValidation";

const {OptGroup, Option} = Select;

const NextTriggerElement = props => {
   const {
      value, changedScenario, changedTrigger,
      changedSocial, match, index, type, botScenarios,
      getAllAutorides, autoridesData, loadingOfAutoRides,
   } = props;

   const [radioValue, setRadioValue] = useState(1);

   useEffect(() => {
      getAllAutorides(match.params.botId)
   }, []);

   const onChange = e => {
      setRadioValue(e.target.value);
   };

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

   const getTriggerForAnotherStream = () => {
      const result = [];

      botScenarios
         .filter(scenario => scenario.destination === destinationScenario.default && scenario.id !== changedScenario.id)
         .forEach(scenario => result.push({
            trigger_text: scenario.trigger_text,
            displayText: 'Сообщений из сценария',
            triggers: scenario.triggers,
            id: scenario.id
         }));

      autoridesData
         .filter(autoRide => autoRide.id !== changedScenario.id)
         .forEach(autoRide => result.push({
            trigger_text: autoRide.scenario.trigger_text,
            displayText: 'Сообщений из автоворонки',
            triggers: autoRide.scenario.triggers,
            id: autoRide.scenario.id
         }));

      return result;
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
            <p className={`${style.nextTriggerContainerTitle}`}>Переход к существующему шагу:</p>

            <Radio.Group onChange={onChange} value={radioValue}>
               <Radio value={1}>Существующие</Radio>
               <Radio value={2}>С другого потока</Radio>
            </Radio.Group>

            {radioValue === 1 && (
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
            )}

            {radioValue === 2 && (
               <Select
                  showSearch
                  className={style.nextTriggerSelection}
                  style={{width: "100%"}}
                  defaultValue={defaultValue}
                  optionFilterProp="children"
                  onChange={updateTrigger}
                  loading={loadingOfAutoRides}
                  placeholder="Выберите шаг для перехода"
                  filterOption={(input, option) =>
                     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
               >
                  {getTriggerForAnotherStream().map(item => (
                     <OptGroup label={`${item.displayText}: ${sliceExtraText(item.trigger_text, 11)}`}>
                        {item && item.triggers.map(trigger => (
                           <Option value={trigger.id}>{trigger.caption}</Option>
                        ))}
                     </OptGroup>
                  ))}
               </Select>
            )}
         </div>
      </div>
   );
};

const mapStateToProps = ({singleBotReducers, autoridesReducers}) => ({
   changedSocial: singleBotReducers.changedSocial,
   botScenarios: singleBotReducers.botScenarios,
   loadingOfAutoRides: autoridesReducers.loadingOfAutoRides,
   autoridesData: autoridesReducers.autoridesData,
});

const mapDispatchToProps = dispatch => ({
   getAllAutorides: botId => dispatch(getAllAutorides(botId)),
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(NextTriggerElement);