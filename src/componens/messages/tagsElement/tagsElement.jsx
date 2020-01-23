import React from 'react';

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import SelectForTags from "../SelectForTags/SelectForTags";

import style from "./tagsElement.module.scss";

const TagsElement = props => {
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
            <SelectForTags placeholder="Добавить теги" style={{width: '100%'}} isTagCreator/>
         </div>

         <div className={style.tagsElementContainerField}>
            <SelectForTags placeholder="Убрать теги" style={{width: '100%'}}/>
         </div>
      </div>
   )
};

export default TagsElement;
