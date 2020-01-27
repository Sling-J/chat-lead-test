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
      if (tagsValue.tag && tagsValue.tag.length !== 0) {
         tagsValue.tag.split(',').forEach(item => {
            tagsSelectOptions.push(<Option key={item}>{item}</Option>);
         });

         setTagsArr([...tagsValue.tag.split(',')]);
      }
   }, []);

   const handleChange = valueOf => {
      setSearchValue('');
      setTagsArr(valueOf);

      valueOf.forEach(item => {
         tagsSelectOptions.push(<Option key={item}>{item}</Option>);
      });

      const messagesCopy = changedTrigger.messages;
      messagesCopy[changedSocial][index].tag = valueOf.toString();

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
