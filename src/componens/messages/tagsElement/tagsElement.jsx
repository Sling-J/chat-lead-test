import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {updateTrigger} from "../../../actions/actionCreator";
import {Divider, Icon, Select} from "antd";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';

import style from "./tagsElement.module.scss";

const {Option} = Select;

const TagsElement = props => {
   const {changedSocial, updateTrigger, value, index, type, changedTrigger, match} = props;

   const [searchValue, setSearchValue] = useState('');
   const [sTagsArr, setTagsArr] = useState([]);
   const [rTagsValue, setRTagsValue] = useState([]);

   useEffect(() => {
      if (value.updateTag && value.updateTag.setTag.length !== 0) {
         setTagsArr([...value.updateTag.setTag]);
      }

      if (value.updateTag && value.updateTag.removeTag.length !== 0) {
         setRTagsValue([...value.updateTag.removeTag]);
      }
   }, []);

   const handleChangeS = valueOf => {
      const messagesCopy = changedTrigger.messages;

      setSearchValue('');
      setTagsArr(valueOf);
      messagesCopy[changedSocial][index].updateTag.setTag = valueOf;

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
      messagesCopy[changedSocial][index].updateTag.removeTag = valueOf;

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: match.params.botId
      };

      updateTrigger(triggerData, null, changedSocial);
   };

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
               style={{width: "100%"}}
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

         <div className={style.tagsElementContainerField}>
            <Select
               mode="tags"
               style={{width: "100%"}}
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
)(TagsElement);

