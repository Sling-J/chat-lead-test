import React, {useState, useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import {updateTrigger} from "../../../actions/actionCreator";
import {matchNumber} from "../../../utils/textValidation";

import {Input} from 'antd';

import style from './contactsElement.module.sass';
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";

const ContactsElement = props => {
	const {type, index, match, value, changedTrigger} = props;

	const [phone, setPhone] = useState('');

	useEffect(() => {
		if (value.sendContact.contactId.length !== 0) {
			setPhone(value.sendContact.contactId);
		}
	}, []);

   const updateTrigger = event => {
      const messagesCopy = changedTrigger.messages;
		const contact = messagesCopy[props.changedSocial][index];

		contact.contact = 'done';
		contact.sendContact.contactId = parseInt(event.target.value);

		const triggerData = {
			...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: match.params.botId
		};

		setPhone(parseInt(event.target.value));
      phone !== value.sendContact.contactId && props.updateTrigger(triggerData, null, props.changedSocial);
   };

   return (
      <div className={style.mainContainer}>
         <ConditionsToggle isOpenConditions={value.conditions} {...props}/>
         <ConditionsContainer conditions={value.conditions}/>

         <div className={style.hoverBar}>
            <HoverBarForMessage {...props}/>
         </div>

			<div className={`${style.contactsContainer} ${value.conditions && style.contactsRadius}`}>
				<p>Отправление контакта</p>

				<form className={style.contactsContainerForm}>
					<label className={style.contactsContainerFormField}>
						<div className={style.contactsContainerFormFieldLabel}>Номер телефона</div>
						<Input
							className={style.contactsContainerFormFieldInput}
							defaultValue={value.sendContact.contactId}
							placeholder="77077206590"
							onBlur={updateTrigger}
							onInput={matchNumber}
							type="text"
						/>
					</label>
				</form>
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
)(ContactsElement);
