import React from 'react';
import audio from '../images/buttons/audio.png';
import text from '../images/buttons/text.png';
import picture from '../images/buttons/image.png';
import video from '../images/buttons/video.png';
import file from '../images/buttons/file.png';
import card from '../images/buttons/card.png';
import gallery from '../images/buttons/gallery.png';
import list from '../images/buttons/list.png';
import pause from '../images/buttons/clock.png';
import activityLost from '../images/buttons/calendar.png';
import form from '../images/buttons/form.png';
import sendTime from '../images/buttons/warn.png';
import print from '../images/buttons/print.png';

export const addNewMessagesButtons = {
   facebook: [
      {
         label: '+Текст',
         icon: <img src={text} alt={'text'}/>,
         type: 'text'
      },
      {
         label: '+Картинка',
         icon: <img src={picture} alt={'image'}/>,
         type: 'photo'
      },
      {
         label: '+Аудио',
         icon: <img src={audio} alt={'audio'}/>,
         type: 'audio'
      },
      {
         label: '+Видео',
         icon: <img src={video} alt={'video'}/>,
         type: 'video'
      },
      {
         label: '+Файл',
         icon: <img src={file} alt={'file'}/>,
         type: 'file'
      },
      {
         label: '+Карта',
         icon: <img src={card} alt={'card'}/>,
         type: 'card'
      },
      {
         label: '+Галерея',
         icon: <img src={gallery} alt={'gallery'}/>,
         type: 'gallery'
      },
      {
         label: '+Список',
         icon: <img src={list} alt={'list'}/>,
         type: 'list'
      },
      {
         label: '+Пауза',
         type: 'timer',
         icon: <img src={pause} alt={'pause'}/>,
         optionalType: 'pause_delay'
      },
      {
         label: '+Ждать до',
         type: 'timer',
         icon: <img src={activityLost} alt={'activityLost'}/>,
         optionalType: 'activity_lost'
      },
      {
         label: '+Форма',
         icon: <img src={form} alt={'form'}/>,
         type: 'form'
      },
      {
         label: '+Потеря активности',
         icon: <img src={sendTime} alt={'sendTime'}/>,
         type: 'timer',
         optionalType: 'send_time'
      },
      {
         label: '+Печать',
         icon: <img src={print} alt={'typing'}/>,
         type: 'type_processing'
      }
   ],
   telegram: [
      {
         label: '+Текст',
         icon: <img src={text} alt={'text'}/>,
         type: 'text'
      }, {
         label: '+Картинка',
         icon: <img src={picture} alt={'image'}/>,
         type: 'photo'
      }, {
         label: '+Аудио',
         icon: <img src={audio} alt={'audio'}/>,
         type: 'audio'
      }, {
         label: '+Видео',
         icon: <img src={video} alt={'video'}/>,
         type: 'video'
      }, {
         label: '+Файл',
         icon: <img src={file} alt={'file'}/>,
         type: 'file'
      }, {
         label: '+Пауза',
         type: 'timer',
         icon: <img src={pause} alt={'pause'}/>,
         optionalType: 'pause_delay'
      }, {
         label: '+Ждать до',
         type: 'timer',
         icon: <img src={activityLost} alt={'activityLost'}/>,
         optionalType: 'activity_lost'
      }, {
         label: '+Форма',
         icon: <img src={form} alt={'form'}/>,
         type: 'form'
      }, {
         label: '+Потеря активности',
         icon: <img src={sendTime} alt={'sendTime'}/>,
         type: 'timer',
         optionalType: 'send_time'
      }, {
         label: '+Печать',
         icon: <img src={print} alt={'typing'}/>,
         type: 'type_processing'
      }
   ],
   vk: [
      {
         label: '+Текст',
         icon: <img src={text} alt={'text'}/>,
         type: 'text'
      }, {
         label: '+Картинка',
         icon: <img src={picture} alt={'image'}/>,
         type: 'photo'
      }, {
         label: '+Аудио',
         icon: <img src={audio} alt={'audio'}/>,
         type: 'audio'
      }, {
         label: '+Видео',
         icon: <img src={video} alt={'video'}/>,
         type: 'video'
      }, {
         label: '+Файл',
         icon: <img src={file} alt={'file'}/>,
         type: 'file'
      }, {
         label: '+Пауза',
         type: 'timer',
         icon: <img src={pause} alt={'pause'}/>,
         optionalType: 'pause_delay'
      }, {
         label: '+Ждать до',
         type: 'timer',
         icon: <img src={activityLost} alt={'activityLost'}/>,
         optionalType: 'activity_lost'
      }, {
         label: '+Форма',
         icon: <img src={form} alt={'form'}/>,
         type: 'form'
      }, {
         label: '+Потеря активности',
         icon: <img src={sendTime} alt={'sendTime'}/>,
         type: 'timer',
         optionalType: 'send_time'
      }, {
         label: '+Печать',
         icon: <img src={print} alt={'typing'}/>,
         type: 'type_processing'
      }
   ],
   whatsapp: [
      {
         label: '+Текст',
         icon: <img src={text} alt={'text'}/>,
         type: 'text'
      }, {
         label: '+Картинка',
         icon: <img src={picture} alt={'image'}/>,
         type: 'photo'
      }, {
         label: '+Аудио',
         icon: <img src={audio} alt={'audio'}/>,
         type: 'audio'
      }, {
         label: '+Видео',
         icon: <img src={video} alt={'video'}/>,
         type: 'video'
      }, {
         label: '+Файл',
         icon: <img src={file} alt={'file'}/>,
         type: 'file'
      }, {
         label: '+Пауза',
         type: 'timer',
         icon: <img src={pause} alt={'pause'}/>,
         optionalType: 'pause_delay'
      }, {
         label: '+Ждать до',
         type: 'timer',
         icon: <img src={activityLost} alt={'activityLost'}/>,
         optionalType: 'activity_lost'
      }, {
         label: '+Форма',
         icon: <img src={form} alt={'form'}/>,
         type: 'form'
      }, {
         label: '+Потеря активности',
         icon: <img src={sendTime} alt={'sendTime'}/>,
         type: 'timer',
         optionalType: 'send_time'
      }
   ]
};
