import React from 'react';
import style from './actionsContextMenu.module.sass';
import onClickOutside from "react-onclickoutside";
import {connect} from "react-redux";
import {tagsTypes} from "../../../../../constants/defaultValues";


const ActionsContextMenu = (props) => {
   const {openContextMenu, editTagsInButton} = props;


   ActionsContextMenu.handleClickOutside = () => openContextMenu(false);

   return (

      <div className={style.mainContainer}>
         <ul className={style.contextMenuMainContainer}>
            <li onClick={() => editTagsInButton(tagsTypes.AddTags)}>Добавить тег</li>
            <li onClick={() => editTagsInButton(tagsTypes.Remove_Tags)}>Удалить тег</li>
         </ul>
      </div>

   )
};

const clickOutsideConfig = {
   handleClickOutside: () => ActionsContextMenu.handleClickOutside
};

export default onClickOutside(connect(null)(ActionsContextMenu), clickOutsideConfig);
