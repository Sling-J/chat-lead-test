import React from "react";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsForElements from '../conditionsForElements/conditionsForElements';

import style from "./sendLinkElement.module.scss"

const SendLinkElement = props => {
	return (
		<div className={style.sendLinkContainer}>
			<ConditionsForElements/>
			<div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>

			<div className={style.sendLinkBox}>
				<div className={style.sendLinkBoxField}>
					<p>Напишите URL:</p>
				</div>

				<div className={style.sendLinkBoxField}>
					<p>Если кликнул по ссылке::</p>
				</div>

				<div className={style.sendLinkBoxField}>
					<p>Если не кликнул по ссылке::</p>
				</div>
			</div>
		</div>
	)
};

export default SendLinkElement;