import React from 'react';

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import {Select} from "antd";

import style from "./tagsElement.module.scss";

const { Option } = Select;

const TagsElement = props => {
	const children = [];

	for (let i = 10; i < 20; i++) {
		children.push(<Option key={i.toString(20) + i}>{i.toString(20) + i}</Option>);
	}

	function handleChange(value) {
		console.log(`selected ${value}`);
	 }

	return (
		<div className={style.tagsElementContainer}>
			<div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>

			<p className={style.tagsElementContainerTitle}>Используйте этот блок, чтобы добавить или убрать теги в работе цепочки</p>

			<div className={style.tagsElementContainerField}>
				<Select 
					className={style.tagsElementContainerFieldSelect} 
					mode="tags" 
					style={{ width: '100%' }} 
					placeholder="Добавить теги" 
					onChange={handleChange}
				>
					{children}
				</Select>
			</div>

			<div className={style.tagsElementContainerField}>
				<Select
					className={style.tagsElementContainerFieldSelect}
					mode="multiple"
					style={{ width: '100%' }}
					placeholder="Убрать теги"
					onChange={handleChange}
				>
					{children}
				</Select>
			</div>
		</div>
	)
};

export default TagsElement;