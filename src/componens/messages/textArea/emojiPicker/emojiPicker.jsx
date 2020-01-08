import React from "react";

import Popover from '@material-ui/core/Popover';
import {Picker} from "emoji-mart";

import style from '../textArea.module.sass';

const i18n = {
   search: 'Поиск',
   clear: 'Очистить',
   notfound: 'Такого смайлика нету',
   categories: {
      search: 'Результаты поиска',
      recent: 'Часто используемый',
      people: 'Эмоций и Люди',
      nature: 'Животные и Природа',
      foods: 'Еда и напитки',
      activity: 'Мероприятия',
      places: 'Путешествия и Места',
      objects: 'Объекты',
      symbols: 'Символы',
      flags: 'Флаги',
      custom: 'Разные',
   },
   categorieslabel: 'Категории',
};

function EmojiPicker({customStyle, setTextAreaValue, textAreaValue, handler, index, componentType, emojiSize}) {
   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = event => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
      handler && handler({target: {value: textAreaValue}}, index, componentType);
   };

   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;

   return (
      <div className={style.emojiContainer}>
         <div className={customStyle} onClick={handleClick} aria-describedby={id}/>

         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
         >
            <Picker
               onSelect={emoji => setTextAreaValue(textAreaValue + emoji.native)}
               i18n={i18n}
               emojiSize={emojiSize}
               emoji="point_up"
               showSkinTones={false}
               showPreview={false}
               title={null}
            />
         </Popover>
      </div>
   );
}

export default EmojiPicker;
