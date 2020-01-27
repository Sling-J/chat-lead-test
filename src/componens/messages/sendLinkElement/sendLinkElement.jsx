import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {updateTrigger} from "../../../actions/actionCreator";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";

import {Input, Icon, Popover, Divider, Select} from "antd";

import style from "./sendLinkElement.module.scss"

const {Option} = Select;

const SendLinkElement = props => {
   const {type, index, match, value, changedTrigger, changedSocial, updateTrigger} = props;
   const [url, setUrl] = useState('');

   const [searchValue, setSearchValue] = useState('');
   const [sTagsArr, setTagsArr] = useState([]);
   const [rTagsValue, setRTagsValue] = useState([]);

   useEffect(() => {
      if (value.sendUrl && value.sendUrl.setTag.length !== 0) {
         setTagsArr([...value.sendUrl.setTag]);
      }

      if (value.sendUrl && value.sendUrl.delTag.length !== 0) {
         setRTagsValue([...value.sendUrl.delTag]);
      }
   }, []);

   useEffect(() => {
      if (value.sendUrl && value.sendUrl.url.length !== 0) {
         setUrl(value.sendUrl.url);
      }
   }, []);

   const handleChangeText = event => {
      const messagesCopy = changedTrigger.messages;

      messagesCopy[changedSocial][index].sendUrl.url = event.target.value;

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: match.params.botId
      };

      value.sendUrl.url !== url && updateTrigger(triggerData, null, changedSocial);
   };

   const handleChangeS = valueOf => {
      const messagesCopy = changedTrigger.messages;

      setSearchValue('');
      setTagsArr(valueOf);
      messagesCopy[changedSocial][index].sendUrl.setTag = valueOf;

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: match.params.botId
      };

      updateTrigger(triggerData, null, changedSocial);
   };

   const handleChangeR = valueOf => {
      const messagesCopy = changedTrigger.messages;

      setSearchValue('');
      setRTagsValue(valueOf);
      messagesCopy[changedSocial][index].sendUrl.delTag = valueOf;

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: match.params.botId
      };

      updateTrigger(triggerData, null, changedSocial);
   };

   const tMenuSelectTags = (
      <div className={style.sendLinkTMenu}>
         <Select
            mode="tags"
            placeholder="Добавить теги"
            style={{width: '250px'}}
            onChange={handleChangeS}
            value={sTagsArr}
            onSearch={value => setSearchValue(value)}
            dropdownRender={menu => {
               const result = sTagsArr.find(item => item === searchValue);

               return (
                  <div>
                     <div
                        style={{padding: '4px 8px', cursor: 'pointer'}}
                        onMouseDown={e => e.preventDefault()}
                     >
                        {!result && searchValue.length !== 0 && (<><Icon type="plus"/> Создать «{searchValue}»</>)}
                     </div>
                     <Divider style={{margin: '4px 0'}}/>
                     {menu}
                  </div>
               )
            }}
         >
            {sTagsArr.map(tag => (
               <Option key={tag}>{tag}</Option>
            ))}
         </Select>
      </div>
   );

   const tMenuSelectMultiple = (
      <div className={style.sendLinkTMenu}>
         <Select
            mode="tags"
            placeholder="Убрать теги"
            style={{width: "250px"}}
            value={rTagsValue}
            onChange={handleChangeR}
            onSearch={value => setSearchValue(value)}
            dropdownRender={menu => {
               const result = rTagsValue.find(item => item === searchValue);

               return (
                  <div>
                     <div
                        style={{padding: '4px 8px', cursor: 'pointer'}}
                        onMouseDown={e => e.preventDefault()}
                     >
                        {!result && searchValue.length !== 0 && (<><Icon type="plus"/> Создать «{searchValue}»</>)}
                     </div>
                     <Divider style={{margin: '4px 0'}}/>
                     {menu}
                  </div>
               )
            }}
         >
            {rTagsValue.map(tag => (
               <Option key={tag}>{tag}</Option>
            ))}
         </Select>
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

   return (
      <div className={style.sendLinkContainer}>
         <ConditionsToggle isOpenConditions={props.value.conditions} {...props}/>
         <ConditionsContainer conditions={props.value.conditions} {...props}/>

         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>

         <div className={`${style.sendLinkBox} ${props.value.conditions && style.linkRadius}`}>
            <div className={style.sendLinkBoxField}>
               <p className={style.sendLinkBoxTitle}>Напишите URL:</p>
               <Input
                  type="text"
                  placeholder="https://chatlead.io"
                  defaultValue={value.sendUrl.url}
                  onBlur={handleChangeText}
               />
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
)(SendLinkElement);
