import React, {Fragment, useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {updateTrigger} from "../../../actions/actionCreator";
import {moduleName as tagsModule, addTag} from "../../../ducks/Tags";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";
import FilledStatusContainer from "../../Containers/FilledStatusContainer";

import {Input, Icon, Popover, Divider, Select} from "antd";

import style from "./sendLinkElement.module.scss"

const {Option} = Select;

const SendLinkElement = props => {
   const {
      type, index, match, value,
      changedTrigger, changedSocial, updateTrigger,
      loadingOfAdding, loadingOfTags, tags, addTag
   } = props;
   const [url, setUrl] = useState('');

   const [searchValue, setSearchValue] = useState('');
   const [sTagsValue, setSTagsValue] = useState([]);
   const [rTagsValue, setRTagsValue] = useState([]);

   useEffect(() => {
      if (value.sendUrl && value.sendUrl.setTag.length !== 0) {
         setSTagsValue([...value.sendUrl.setTag]);
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

   const handleChange = (valueOf, isAbsent) => {
      const messagesCopy = changedTrigger.messages;
      const lowerTags = valueOf.map(item => item.toLowerCase());

      setSearchValue('');

      if (isAbsent) {
         setRTagsValue(lowerTags);
         messagesCopy[changedSocial][index].sendUrl.delTag = lowerTags;
      } else {
         setSTagsValue(lowerTags);
         messagesCopy[changedSocial][index].sendUrl.setTag = lowerTags;
      }

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: match.params.botId
      };

      updateTrigger(triggerData, null, changedSocial);
   };

   const onSelect = valueOf => {
      const result = tags.find(tag => tag.name === valueOf);
      !result && addTag({botId: match.params.botId, tag: valueOf.toLowerCase()});
   };

   const tMenuSelectTags = (
      <div className={style.sendLinkTMenu}>
         <Select
            mode="tags"
            placeholder="Добавить теги"
            style={{width: '250px'}}
            onChange={value => handleChange(value, false)}
            loading={loadingOfAdding || loadingOfTags}
            onSelect={onSelect}
            value={sTagsValue}
            onSearch={value => setSearchValue(value)}
            dropdownRender={menu => {
               const result = tags.find(item => item.name === searchValue);

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
            {tags.map(tag => (
               <Option key={tag.name}>{tag.name}</Option>
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
            onChange={value => handleChange(value, true)}
            loading={loadingOfAdding || loadingOfTags}
            onSelect={onSelect}
            onSearch={value => setSearchValue(value)}
            dropdownRender={menu => {
               const result = tags.find(item => item.name === searchValue);

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
            {tags.map(tag => (
               <Option key={tag.name}>{tag.name}</Option>
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
         <FilledStatusContainer title="- Пожалуйста, введите URL сайта" status={value.sendUrl.url.length !== 0}>
            {({isHovered}) => (
               <Fragment>
                  <ConditionsToggle isOpenConditions={props.value.conditions} {...props}/>
                  <ConditionsContainer conditions={props.value.conditions} {...props}/>

                  <div className={style.hoverBar}>
                     <HoverBarForMessage
                        {...props}
                     />
                  </div>

                  <div className={`${style.sendLinkBox} ${props.value.conditions && style.linkRadius} ${isHovered && style.linkBorderColor}`}>
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
               </Fragment>
            )}
         </FilledStatusContainer>
      </div>
   )
};

const mapStateToProps = state => ({
   changedSocial: state.singleBotReducers.changedSocial,

   loadingOfAdding: state[tagsModule].loadingOfAdding,
   loadingOfTags: state[tagsModule].loadingOfTags,
   tags: state[tagsModule].tags
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
   addTag: data => dispatch(addTag(data)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(SendLinkElement);
