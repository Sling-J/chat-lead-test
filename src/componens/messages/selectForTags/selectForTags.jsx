import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {Divider, Icon, Select} from "antd";
import {updateTrigger} from "../../../actions/actionCreator";

import {moduleName as tagsModule, addTag} from "../../../ducks/Tags";

const {Option} = Select;

const SelectForTags = ({
   isTagCreator, placeholder, style,
   changedTrigger, index, match,
   updateTrigger, type, changedSocial,
   tagsValue, loadingOfAdding,
   loadingOfTags, tags, addTag
}) => {
   const [searchValue, setSearchValue] = useState('');
   const [absentSearchValue, setAbsentSearchValue] = useState('');

   const [sTagsValue, setTagsValue] = useState([]);
   const [absentTagsValue, setAbsentTagsValue] = useState([]);

   useEffect(() => {
      if (tagsValue.tag && tagsValue.tag.length !== 0) {
         setTagsValue([...tagsValue.tag.split(',').map(item => item.toLowerCase())]);
      }

      if (tagsValue.exclude_tags && tagsValue.exclude_tags.length !== 0) {
         setAbsentTagsValue([...tagsValue.exclude_tags.split(',').map(item => item.toLowerCase())]);
      }
   }, []);

   const handleChange = (valueOf, isAbsent) => {
      const messagesCopy = changedTrigger.messages;
      const lowerTags = valueOf.map(item => item.toLowerCase());

      if (isAbsent) {
         setAbsentSearchValue('');
         setAbsentTagsValue(lowerTags);

         messagesCopy[changedSocial][index].exclude_tags = lowerTags.toString();
      } else {
         setSearchValue('');
         setTagsValue(lowerTags);

         messagesCopy[changedSocial][index].tag = lowerTags.toString();
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

   const sendingCondition = (valueOf, isAbsent) => {
      const messagesCopy = changedTrigger.messages;

      if (isAbsent) {
         messagesCopy[changedSocial][index].is_tag_all = valueOf.key === 'true';
      } else {
         messagesCopy[changedSocial][index].is_exclude_tag_all = valueOf.key === 'true';
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

   return isTagCreator ? (
      <div className="conditionSelectContainer">
         <div>
            <Select
               className="conditionSelectBefore"
               labelInValue
               onChange={value => sendingCondition(value, false)}
               defaultValue={{key: tagsValue.is_tag_all ? 'true' : 'false'}}
               style={{width: 80}}
            >
               <Option value="true">(и):</Option>
               <Option value="false">(или):</Option>
            </Select>
         </div>
         <Select
            mode="tags"
            style={style}
            className="conditionSelectElement"
            placeholder={placeholder}
            loading={loadingOfAdding || loadingOfTags}
            onChange={value => handleChange(value, false)}
            value={sTagsValue}
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
   ) : (
      <div className="conditionSelectContainer">
         <div>
            <Select
               className="conditionSelectBefore"
               labelInValue
               defaultValue={{key: tagsValue.is_exclude_tag_all ? 'true' : 'false'}}
               onChange={value => sendingCondition(value, true)}
               style={{width: 80}}
            >
               <Option value="true">(и):</Option>
               <Option value="false">(или):</Option>
            </Select>
         </div>
         <Select
            mode="tags"
            style={style}
            className="conditionSelectElement"
            placeholder={placeholder}
            loading={loadingOfAdding || loadingOfTags}
            onChange={value => handleChange(value, true)}
            value={absentTagsValue}
            onSelect={onSelect}
            onSearch={value => setAbsentSearchValue(value)}
            dropdownRender={menu => {
               const result = tags.find(item => item.name === absentSearchValue);

               return (
                  <div>
                     <div
                        style={{padding: '4px 8px', cursor: 'pointer'}}
                        onMouseDown={e => e.preventDefault()}
                     >
                        {!result && absentSearchValue.length !== 0 && (<><Icon type="plus"/> Создать
                           «{absentSearchValue}»</>)}
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
)(SelectForTags);
