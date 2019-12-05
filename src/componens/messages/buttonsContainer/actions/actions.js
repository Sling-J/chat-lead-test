import React, {useState} from 'react';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import {updateTrigger} from "../../../../actions/actionCreator";
import {tagsTypes, tagsTranscription, buttonsTypes} from "../../../../constants/defaultValues";
import ActionsContextMenu from './actionsContextMenu/actionsContextMenu';

import style from './actions.module.sass';


const Actions = (props) => {
   const {buttonEditHandler, typeButton, indexButton, buttonData} = props;
   const [isOpenContextMenu, openContextMenu] = useState(false);

   const editTagsInButton = (typeTag) => {
      if (!buttonData[typeTag]) {
         Object.assign(buttonData, {
            [typeTag]: []
         });
      }

      buttonData[typeTag].push('');
      buttonEditHandler(
         (typeButton === buttonsTypes.trigger_buttons && buttonData.type !== buttonsTypes.fast_buttons) ? buttonsTypes.text_buttons : typeButton,
         buttonData,
         indexButton,
         buttonData.isEmpty,
         false,
         typeButton
      );

   };

   const updateTag = (e, key, index) => {
      buttonData[key][index] = e.target.value;
      buttonEditHandler(
         (typeButton === buttonsTypes.trigger_buttons && buttonData.type !== buttonsTypes.fast_buttons) ? buttonsTypes.text_buttons : typeButton,
         buttonData,
         indexButton,
         buttonData.isEmpty,
         false,
         typeButton
      );
   };

   const deleteTag = (key, index) => {
      buttonData[key].splice(index, 1);
      buttonEditHandler(
         (typeButton === buttonsTypes.trigger_buttons && buttonData.type !== buttonsTypes.fast_buttons) ? buttonsTypes.text_buttons : typeButton,
         buttonData,
         indexButton,
         buttonData.isEmpty,
         false,
         typeButton
      );
   };

   return (
      <div className={style.actionsMainContainer}>
         <h2>Дополнительные действия: </h2>
         {Object.keys(buttonData).map(key => (
            (key === tagsTypes.AddTags || key === tagsTypes.Remove_Tags) && (
               buttonData[key].map((elem, index) => (
                  <div className={style.actionElement}>
                     <div className={style.actionElementBox}>
                        <label>
                           {tagsTranscription[key]}
                        </label>
                        <p onClick={() => deleteTag(key, index)}>
                           <FontAwesomeIcon icon={faTimes}/>
                        </p>
                     </div>
                     <input
                        type={'text'}
                        defaultValue={elem}
                        onInput={(e) => updateTag(e, key, index)}
                     />
                  </div>
               ))
            )
         ))}
         <div className={style.controlsContainer} onClick={() => openContextMenu(true)}>
            {isOpenContextMenu && (
               <ActionsContextMenu
                  openContextMenu={openContextMenu}
                  editTagsInButton={editTagsInButton}
               />
            )}
            <div className={style.actionsContainer}>
               + Действие
            </div>
         </div>
      </div>
   )
};

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData) => dispatch(updateTrigger(triggerData, updationData)),
});

export default connect(mapDispatchToProps)(Actions);
