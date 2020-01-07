import React, {useState} from "react";

import {Input} from 'antd';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
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

function EmojiPicker() {
   const [message, SetMessage] = useState("");

   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = event => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;

   return (
      <div className={style.emojiContainer}>
         <Input
            value={message}
            onChange={event => SetMessage(event.target.value)}
         />
         <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
            Open Popover
         </Button>

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
               onSelect={emoji => SetMessage(message + emoji.native)}
               i18n={i18n}
               emojiSize={20}
               sheetSize={32}
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