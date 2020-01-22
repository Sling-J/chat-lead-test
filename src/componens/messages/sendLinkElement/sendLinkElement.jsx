import React from "react";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsForElements from '../conditionsForElements/conditionsForElements';

import {Input, Menu, Dropdown, Select, Icon} from "antd";

import style from "./sendLinkElement.module.scss"

const {SubMenu} = Menu;

const SendLinkElement = props => {
   function handleChange(value) {
      console.log(`selected ${value}`);
   }

   const tMenu = (
      <Menu>
         <SubMenu title="Добавить теги">
            <Select
               mode="tags"
               style={{width: '250px'}}
               placeholder="Добавить теги"
               onChange={handleChange}
            />
         </SubMenu>
         <SubMenu title="Убрать теги">
            <Select
               mode="tags"
               style={{width: '250px'}}
               placeholder="Убрать теги"
               onChange={handleChange}
            />
         </SubMenu>
      </Menu>
   );

   const fMenu = (
      <Menu>
         <SubMenu title="Добавить теги">
            <Select
               mode="tags"
               style={{width: '250px'}}
               placeholder="Добавить теги"
               onChange={handleChange}
            />
         </SubMenu>
         <SubMenu title="Убрать теги">
            <Select
               mode="tags"
               style={{width: '250px'}}
               placeholder="Убрать теги"
               onChange={handleChange}
            />
         </SubMenu>
      </Menu>
   );

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
               <p className={style.sendLinkBoxTitle}>Напишите URL:</p>
               <Input type="text" placeholder="https://chatlead.io"/>
            </div>

            <div className={style.sendLinkBoxField}>
               <p className={style.sendLinkBoxTitle}>Если кликнул по ссылке:</p>
               <Dropdown overlay={tMenu} trigger={['click']}>
                  <div className={style.sendLinkBoxSelect}>
                     <p>Выберите действия</p>
                     <Icon type="down"/>
                  </div>
               </Dropdown>
            </div>

            <div className={style.sendLinkBoxField}>
               <p className={style.sendLinkBoxTitle}>Если не кликнул по ссылке:</p>
               <Dropdown overlay={fMenu} trigger={['click']}>
                  <div className={style.sendLinkBoxSelect}>
                     <p>Выберите действия</p>
                     <Icon type="down"/>
                  </div>
               </Dropdown>
            </div>
         </div>
      </div>
   )
};

export default SendLinkElement;
