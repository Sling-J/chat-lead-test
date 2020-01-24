import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {Divider, Icon, Select} from "antd";
import {updateTrigger} from "../../../actions/actionCreator";

const {Option} = Select;

const SelectForTags = ({
   isTagCreator, placeholder, style,
   changedTrigger, index, match,
   updateTrigger, type, changedSocial,
   tagsValue
}) => {
   const [searchValue, setSearchValue] = useState('');
   const [sTagsArr, setTagsArr] = useState([]);

   const tagsSelectOptions = [];

   useEffect(() => {
      if (Object.keys(tagsValue[type])[0] === 'send_time') {
         if (tagsValue[type].send_time.tag.length !== 0) {
            tagsValue[type].send_time.tag.split(',').forEach(item => {
               tagsSelectOptions.push(<Option key={item}>{item}</Option>);
            });

            setTagsArr([...tagsValue[type].send_time.tag.split(',')]);
         }
      } else if (Object.keys(tagsValue[type])[0] === 'activity_lost') {
         if (tagsValue[type].tag.length !== 0) {
            tagsValue[type].tag.split(',').forEach(item => {
               tagsSelectOptions.push(<Option key={item}>{item}</Option>);
            });

            setTagsArr([...tagsValue[type].tag.split(',')]);
         }
      } else if (Object.keys(tagsValue[type])[0] === 'pause_delay') {
         if (tagsValue[type].format.tag.length !== 0) {
            tagsValue[type].format.tag.split(',').forEach(item => tagsSelectOptions.push(<Option key={item}>{item}</Option>));

            setTagsArr([...tagsValue[type].format.tag.split(',')]);
         }
      } else {
         if (tagsValue.tag.length !== 0) {
            tagsValue.tag.split(',').forEach(item => {
               tagsSelectOptions.push(<Option key={item}>{item}</Option>);
            });

            setTagsArr([...tagsValue.tag.split(',')]);
         }
      }
   }, []);

   const handleChange = valueOf => {
      setSearchValue('');
      setTagsArr(valueOf);

      valueOf.forEach(item => {
         tagsSelectOptions.push(<Option key={item}>{item}</Option>);
      });

      const messagesCopy = changedTrigger.messages;

      if (Object.keys(tagsValue[type])[0] === 'send_time') {
         messagesCopy[changedSocial][index].timer.send_time.tag = valueOf.toString();
      } else if (Object.keys(tagsValue[type])[0] === 'activity_lost') {
         messagesCopy[changedSocial][index].timer.tag = valueOf.toString();
      } else if (Object.keys(tagsValue[type])[0] === 'pause_delay') {
         messagesCopy[changedSocial][index].timer.format.tag = valueOf.toString();
      } else {
         messagesCopy[changedSocial][index].tag = valueOf.toString();
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

   return isTagCreator ? (
      <Select
         mode="tags"
         style={style}
         placeholder={placeholder}
         onChange={handleChange}
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
         {tagsSelectOptions}
      </Select>
   ) : (
      <Select
         mode="multiple"
         style={style}
         onChange={handleChange}
         placeholder={placeholder}
      />
   );
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
)(SelectForTags);
