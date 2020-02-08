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
   const [absentSearchValue, setAbsentSearchValue] = useState('');

   const [sTagsArr, setTagsArr] = useState([]);
   const [absentSTagsArr, setAbsentTagsArr] = useState([]);

   const tagsSelectOptions = [];
   const absentTagsSelectOptions = [];

   useEffect(() => {
      if (tagsValue.tag && tagsValue.tag.length !== 0) {
         tagsValue.tag.split(',').forEach(item => {
            tagsSelectOptions.push(<Option key={item}>{item}</Option>);
         });

         setTagsArr([...tagsValue.tag.split(',')]);
      }

      if (tagsValue.exclude_tags && tagsValue.exclude_tags.length !== 0) {
         tagsValue.exclude_tags.split(',').forEach(item => {
            absentTagsSelectOptions.push(<Option key={item}>{item}</Option>)
         });

         setAbsentTagsArr([...tagsValue.exclude_tags.split(',')]);
      }
   }, []);

   const handleChange = (valueOf, isAbsent) => {
      const messagesCopy = changedTrigger.messages;

      if (isAbsent) {
         setAbsentSearchValue('');
         setAbsentTagsArr(valueOf);

         valueOf.forEach(item => {
            absentTagsSelectOptions.push(<Option key={item}>{item}</Option>);
         });

         messagesCopy[changedSocial][index].exclude_tags = valueOf.toString();
      } else {
         setSearchValue('');
         setTagsArr(valueOf);

         valueOf.forEach(item => {
            tagsSelectOptions.push(<Option key={item}>{item}</Option>);
         });

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
         mode="tags"
         style={style}
         placeholder={placeholder}
         onChange={handleChange}
         value={absentSTagsArr}
         onSearch={value => setAbsentSearchValue(value)}
         dropdownRender={menu => {
            const result = absentSTagsArr.find(item => item === absentSearchValue);

            return (
               <div>
                  <div
                     style={{padding: '4px 8px', cursor: 'pointer'}}
                     onMouseDown={e => e.preventDefault()}
                  >
                     {!result && absentSearchValue.length !== 0 && (<><Icon type="plus"/> Создать «{absentSearchValue}»</>)}
                  </div>
                  <Divider style={{margin: '4px 0'}}/>
                  {menu}
               </div>
            )
         }}
      >
         {absentTagsSelectOptions}
      </Select>
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
