import React, { useEffect } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import {Popover, Select} from "antd";
import Button from "@material-ui/core/Button";

import {getTags, moduleName as tagsModule} from "../../../ducks/Tags";

import style from './conditionsForElements.module.scss';

// const {Option} = Select;

const info = (
	<div className={style.conditionsContainerInfo}>
	  	<p>Information about ...</p>
	</div>
);

const ConditionsForElements = ({getTags, match}) => {
	// const children = [];

	useEffect(() => {
		getTags(match.params.botId);
	}, []);

	// for (let i = 10; i < 36; i++) {
	// 	children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
	// }

	function handleChange(value) {
		console.log(`selected ${value}`);
	}

	const Menu = (
		<div className={style.conditionsContainerMenu}>
			<h2>Отправить если есть тег:</h2>
			<Select
				mode="multiple"
				style={{ width: '100%' }}
				placeholder="Выберите теги"
				onChange={handleChange}
			/>
		</div>
	);

	return (
		<Popover content={Menu} placement="right" trigger="click" title="Условия">
			<Button className={style.conditionsContainer} variant="outlined">
				<p>Добавить условие</p>

				<Popover content={info} placement="right" title="Информация">
					<div className={style.conditionsContainerIcon}>
						<FontAwesomeIcon icon={faQuestionCircle}/>
					</div>
				</Popover>
			</Button>
		</Popover>
	)
};

const mapStateToProps = state => ({
   loadingOfTags: state[tagsModule].loadingOfTags,
   errorOfTags: state[tagsModule].errorOfTags,
   tags: state[tagsModule].tags
});

const mapDispatchToProps = dispatch => ({
   getTags: botId => dispatch(getTags(botId))
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(ConditionsForElements);
