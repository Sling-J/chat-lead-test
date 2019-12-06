import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import {tagsTypes, tagsTranscription, buttonsTypes} from "../../../../constants/defaultValues";
import ActionsContextMenu from './actionsContextMenu/actionsContextMenu';

import Button from '@material-ui/core/Button';
import {Popover} from "antd";

import style from './actions.module.sass';

const Actions = (props) => {
   const {buttonEditHandler, typeButton, indexButton, buttonData} = props;

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

   const content = (
      <ActionsContextMenu editTagsInButton={editTagsInButton}/>
   );

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
                        placeholder="Введите тег"
                        onInput={(e) => updateTag(e, key, index)}
                     />
                  </div>
               ))
            )
         ))}

         <Popover
            trigger="click"
            placement="right"
            content={content}
         >
            <Button className={style.actionsContainer}>
               + Действие
            </Button>
         </Popover>
      </div>
   )
};

export default Actions;
