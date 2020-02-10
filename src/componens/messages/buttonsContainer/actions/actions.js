import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Button from '@material-ui/core/Button';
import {Divider, Icon, Popover, Select} from "antd";
import {moduleName as tagsModule, addTag} from "../../../../ducks/Tags";

import style from './actions.module.sass';

const {Option} = Select;

const Actions = props => {
   const {
      buttonEditHandler, typeButton, indexButton, buttonData,
      loadingOfAdding, loadingOfTags, tags, addTag, match
   } = props;

   const [searchValue, setSearchValue] = useState('');
   const [absentSearchValue, setAbsentSearchValue] = useState('');

   const [sTagsValue, setTagsValue] = useState([]);
   const [absentTagsValue, setAbsentTagsValue] = useState([]);

   useEffect(() => {
      if (buttonData.addTags && buttonData.addTags.length !== 0) {
         setTagsValue([...buttonData.addTags.split(',').map(item => item.toLowerCase())]);
      }

      if (buttonData.deleteTags && buttonData.deleteTags.length !== 0) {
         setAbsentTagsValue([...buttonData.deleteTags.split(',').map(item => item.toLowerCase())]);
      }
   }, []);

   const handleChange = (valueOf, isAbsent) => {
      const lowerTags = valueOf.map(item => item.toLowerCase());

      if (isAbsent) {
         setAbsentSearchValue('');
         setAbsentTagsValue(lowerTags);
         buttonData.deleteTags = lowerTags.toString();
      } else {
         setSearchValue('');
         setTagsValue(lowerTags);
         buttonData.addTags = lowerTags.toString();
      }

      buttonEditHandler(
         typeButton,
         buttonData,
         indexButton,
         buttonData.isEmpty,
         false,
         typeButton
      );
   };

   const onSelect = valueOf => {
      const result = tags.find(tag => tag.name === valueOf);
      !result && addTag({botId: match.params.botId, tag: valueOf.toLowerCase()});
   };

   const tMenu = (
      <div className={style.actionsTagsMenu}>
         <div className={style.actionsTagsMenuItem}>
            <p>При переходе по ссылке добавиться тег:</p>

            <Select
               mode="tags"
               placeholder="Добавить теги"
               style={{width: "100%"}}
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

         <div className={style.actionsTagsMenuItem}>
            <p>Убрать тег:</p>

            <Select
               mode="tags"
               placeholder="Убрать теги"
               value={absentTagsValue}
               style={{width: "100%"}}
               onChange={value => handleChange(value, true)}
               loading={loadingOfAdding || loadingOfTags}
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
      </div>
   );

   return (
      <div className={style.actionsMainContainer}>
         <h2>Дополнительные действия: </h2>

         <Popover
            content={tMenu}
            trigger="click"
            placement="right"
         >
            <Button className={style.actionsContainer}>
               + Теги
            </Button>
         </Popover>
      </div>
   )
};

export default compose(
   withRouter,
   connect(state => ({
      loadingOfAdding: state[tagsModule].loadingOfAdding,
      loadingOfTags: state[tagsModule].loadingOfTags,
      tags: state[tagsModule].tags,
   }), {addTag})
)(Actions);
