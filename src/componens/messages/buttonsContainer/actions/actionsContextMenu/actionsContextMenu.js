import React from 'react';
import style from './actionsContextMenu.module.sass';
import {tagsTypes} from "../../../../../constants/defaultValues";

const ActionsContextMenu = ({editTagsInButton}) => (
   <div className={style.mainContainer}>
      <ul className={style.contextMenuMainContainer}>
         <li onClick={() => editTagsInButton(tagsTypes.AddTags)}>Добавить тег</li>
         <li onClick={() => editTagsInButton(tagsTypes.Remove_Tags)}>Удалить тег</li>
      </ul>
   </div>
);

export default ActionsContextMenu;
