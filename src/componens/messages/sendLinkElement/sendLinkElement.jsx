import React from "react";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';

import {Input, Select, Icon, Popover} from "antd";

import style from "./sendLinkElement.module.scss"
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";

const SendLinkElement = props => {
   function handleChange(value) {
      console.log(`selected ${value}`);
   }

   const tMenuSelectTags = (
      <div className={style.sendLinkTMenu}>
         <Select
            mode="tags"
            style={{width: '250px'}}
            placeholder="Добавить теги"
            onChange={handleChange}
         />
      </div>
   );

   const tMenuSelectMultiple = (
      <div className={style.sendLinkTMenu}>
         <Select
            mode="multiple"
            style={{width: '250px'}}
            placeholder="Убрать теги"
            onChange={handleChange}
         />
      </div>
   );

   const fMenuSelectTags = (
      <div className={style.sendLinkTMenu}>
         <Select
            mode="tags"
            style={{width: '250px'}}
            placeholder="Добавить теги"
            onChange={handleChange}
         />
      </div>
   );

   const fMenuSelectMultiple = (
      <div className={style.sendLinkTMenu}>
         <Select
            mode="multiple"
            style={{width: '250px'}}
            placeholder="Убрать теги"
            onChange={handleChange}
         />
      </div>
   );

   const tMenu = (
      <div className={style.sendLinkBoxSelectBox}>
         <Popover content={tMenuSelectTags} trigger="click" placement="rightTop">
            <div className={style.sendLinkItem}>
               <p>Добавить теги</p>
               <Icon type="right"/>
            </div>
         </Popover>

         <Popover content={tMenuSelectMultiple} trigger="click" placement="rightBottom">
            <div className={style.sendLinkItem}>
               <p>Убрать теги</p>
               <Icon type="right"/>
            </div>
         </Popover>
      </div>
   );

   const fMenu = (
      <div className={style.sendLinkBoxSelectBox}>
         <Popover content={fMenuSelectTags} trigger="click" placement="rightTop">
            <div className={style.sendLinkItem}>
               <p>Добавить теги</p>
               <Icon type="right"/>
            </div>
         </Popover>

         <Popover content={fMenuSelectMultiple} trigger="click" placement="rightBottom">
            <div className={style.sendLinkItem}>
               <p>Убрать теги</p>
               <Icon type="right"/>
            </div>
         </Popover>
      </div>
   );

   return (
      <div className={style.sendLinkContainer}>
         <ConditionsToggle isOpenConditions={props.value.conditions} {...props}/>
         <ConditionsContainer conditions={props.value.conditions}/>

         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>

         <div className={`${style.sendLinkBox} ${props.value.conditions && style.linkRadius}`}>
            <div className={style.sendLinkBoxField}>
               <p className={style.sendLinkBoxTitle}>Напишите URL:</p>
               <Input type="text" placeholder="https://chatlead.io"/>
            </div>

            <div className={style.sendLinkBoxField}>
               <p className={style.sendLinkBoxTitle}>Если кликнул по ссылке:</p>
               <Popover content={tMenu} trigger="click" placement="bottom">
                  <div className={style.sendLinkBoxSelect}>
                     <p>Выберите действия</p>
                     <Icon type="down"/>
                  </div>
               </Popover>
            </div>

            <div className={style.sendLinkBoxField}>
               <p className={style.sendLinkBoxTitle}>Если не кликнул по ссылке:</p>
               <Popover content={fMenu} trigger="click" placement="bottom">
                  <div className={style.sendLinkBoxSelect}>
                     <p>Выберите действия</p>
                     <Icon type="down"/>
                  </div>
               </Popover>
            </div>
         </div>
      </div>
   )
};

export default SendLinkElement;
