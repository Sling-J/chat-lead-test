import React, {useState} from 'react';

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import {Select, Divider, Icon} from "antd";

import style from "./tagsElement.module.scss";

const { Option } = Select;

const TagsElement = props => {
   const children = [];

   const [searchValue, setSearchValue] = useState('');

   for (let i = 10; i < 20; i++) {
   	children.push(<Option key={i.toString(20) + i}>{i.toString(20) + i}</Option>);
   }

   function handleChange(value) {
      console.log(`selected ${value}`);
   }

   return (
      <div className={style.tagsElementContainer}>
         <div className={style.hoverBar}>
            <HoverBarForMessage {...props}/>
         </div>

         <p className={style.tagsElementContainerTitle}>
            Используйте этот блок, чтобы добавить
            или убрать теги в работе цепочки
         </p>

         <div className={style.tagsElementContainerField}>
            <Select
               mode="tags"
               style={{width: '100%'}}
               placeholder="Добавить теги"
               onChange={handleChange}
               onSearch={value => setSearchValue(value)}
               dropdownRender={menu => {
                  const result = children.find(item => item.key === searchValue);

                  return (
                     <div>
                        <div
                           style={{padding: '4px 8px', cursor: 'pointer'}}
                           onMouseDown={e => e.preventDefault()}
                        >
                           {!result && children.find(item => item.key !== searchValue) && searchValue.length !== 0 && (<><Icon type="plus"/> Создать «{searchValue}»</>)}
                        </div>
                        <Divider style={{margin: '4px 0'}}/>
                        {menu}
                     </div>
                  )
               }}
            >
               {children}
            </Select>
         </div>

         <div className={style.tagsElementContainerField}>
            <Select
               mode="multiple"
               style={{width: '100%'}}
               placeholder="Убрать теги"
               onChange={handleChange}
            />
         </div>
      </div>
   )
};

export default TagsElement;
