import React, {Fragment, useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {updateTrigger} from "../../../actions/actionCreator";
import {moduleName as tagsModule, addTag} from "../../../ducks/Tags";
import {Divider, Icon, Select} from "antd";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";

import style from "./tagsElement.module.scss";

const {Option} = Select;

const TagsElement = props => {
   const {
      changedSocial, updateTrigger, value,
      index, type, changedTrigger, match,
      addTag, loadingOfAdding,
      loadingOfTags, tags
   } = props;

   const [searchValue, setSearchValue] = useState('');

   const [sTagsValue, setSTagsValue] = useState([]);
   const [rTagsValue, setRTagsValue] = useState([]);

   useEffect(() => {
      if (value.updateTag && value.updateTag.setTag.length !== 0) {
         const lowerTags = value.updateTag.setTag.map(tag => tag.toLowerCase());
         setSTagsValue([...lowerTags]);
      }

      if (value.updateTag && value.updateTag.removeTag.length !== 0) {
         const lowerTags = value.updateTag.removeTag.map(tag => tag.toLowerCase());
         setRTagsValue([...lowerTags]);
      }
   }, []);

   const onSelect = valueOf => {
      const result = tags.find(tag => tag.name === valueOf);

      !result && addTag({botId: match.params.botId, tag: valueOf.toLowerCase()});
   };

   const handleChange = (valueOf, isAbsent) => {
      const messagesCopy = changedTrigger.messages;
      const lowerTags = valueOf.map(item => item.toLowerCase());

      setSearchValue('');

      if (isAbsent) {
         setRTagsValue(lowerTags);
         messagesCopy[changedSocial][index].updateTag.removeTag = lowerTags;
      } else {
         setSTagsValue(lowerTags);
         messagesCopy[changedSocial][index].updateTag.setTag = lowerTags;
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

   return (
      <div className={style.tagsElement}>
         <ConditionsToggle isOpenConditions={value.conditions} {...props}/>
         <ConditionsContainer conditions={value.conditions} {...props}/>

         <div className={style.hoverBar}>
            <HoverBarForMessage {...props}/>
         </div>

         <div className={`${style.tagsElementContainer} ${value.conditions && style.tagsElementRadius}`}>
            <p className={style.tagsElementContainerTitle}>
               Используйте этот блок, чтобы добавить
               или убрать теги в работе цепочки
            </p>

            <div className={`${style.tagsElementContainerField} tagsElementContainerField`}>
               <Select
                  mode="tags"
                  style={{width: "100%"}}
                  onChange={value => handleChange(value, false)}
                  value={sTagsValue}
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
                              {!result && searchValue.length !== 0 && (
                                 <Fragment>
                                    <Icon type="plus"/> Создать «{searchValue}»
                                 </Fragment>
                              )}
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

            <div className={`${style.tagsElementContainerField} tagsElementContainerField`}>
               <Select
                  mode="tags"
                  style={{width: "100%"}}
                  onChange={value => handleChange(value, true)}
                  loading={loadingOfAdding || loadingOfTags}
                  value={rTagsValue}
                  onSearch={value => setSearchValue(value)}
                  dropdownRender={menu => {
                     const result = tags.find(item => item.name === searchValue);

                     return (
                        <div>
                           <div
                              style={{padding: '4px 8px', cursor: 'pointer'}}
                              onMouseDown={e => e.preventDefault()}
                           >
                              {!result && searchValue.length !== 0 && (
                                 <><Icon type="plus"/> Создать «{searchValue}»</>
                              )}
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
         </div>
      </div>
   )
};

const mapStateToProps = state => ({
   changedSocial: state.singleBotReducers.changedSocial,

   loadingOfAdding: state[tagsModule].loadingOfAdding,
   errorOfAdding: state[tagsModule].errorOfAdding,

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
)(TagsElement);

