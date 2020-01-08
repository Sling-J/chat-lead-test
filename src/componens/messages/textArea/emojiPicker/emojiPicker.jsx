import React, {useState} from "react";

import {Popover} from 'antd';
import {Picker} from "emoji-mart";

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
   const [emojiPickedStatus, setEmojiPickedStatus] = useState(false);
   const [visible, setVisible] = useState(false);

   const handleVisibleChange = visible => {
      setVisible(visible);

      if (!visible && handler && emojiPickedStatus) {
         handler({target: {value: textAreaValue}}, index, componentType);
         setEmojiPickedStatus(false);
      }
   };

   const content = (
      <Picker
         onSelect={emoji => {
            setTextAreaValue(textAreaValue + emoji.native);
            setEmojiPickedStatus(true);
         }}
         i18n={i18n}
         emojiSize={emojiSize}
         emoji="point_up"
         showSkinTones={false}
         showPreview={false}
         title={null}
      />
   );

   return (
      <Popover
         placement="bottomLeft"
         title={null}
         trigger="click"
         content={content}
         visible={visible}
         onVisibleChange={handleVisibleChange}
      >
         <div className={customStyle}/>
      </Popover>
   );
}

export default EmojiPicker;
