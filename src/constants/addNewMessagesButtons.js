import React from 'react';
import audio from '../images/buttons/audio.png';
import text from '../images/buttons/text.png';
import picture from '../images/buttons/image.png';
import video from '../images/buttons/video.png';
import file from '../images/buttons/file.png';
import card from '../images/buttons/card.png';
import gallery from '../images/buttons/gallery.png';
import pause from '../images/buttons/clock.png';
import activityLost from '../images/buttons/calendar.png';
import form from '../images/buttons/form.png';
import sendTime from '../images/buttons/warn.png';
import print from '../images/buttons/print.png';
import location from '../images/buttons/location.png';
import payment from '../images/buttons/payment.png';
import contact from '../images/buttons/contact.png';
import code from '../images/buttons/code.png';
import tags from '../images/buttons/tags.png';
import sendLink from '../images/buttons/sendLink.png';

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
      },
      {
         label: '+Геоданные',
         icon: <img src={location} alt={'location'}/>,
         type: 'location'
      },
      {
         label: '+Оплата',
         icon: <img src={payment} alt={'payment'}/>,
         type: 'payment'
      },
      {
         label: '+Код',
         icon: <img src={code} alt={'code'}/>,
         type: 'customs'
		},
		{
         label: '+Теги',
         icon: <img src={tags} alt={'code'}/>,
         type: 'tags'
		},
		{
         label: '+Ссылка',
         icon: <img src={sendLink} alt={'code'}/>,
         type: 'sendLink'
      }
   ],
   telegram: [
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
      },
      {
         label: '+Геоданные',
         icon: <img src={location} alt={'location'}/>,
         type: 'location'
      },
      {
         label: '+Оплата ',
         icon: <img src={payment} alt={'payment'}/>,
         type: 'payment'
      },
      {
         label: '+Код ',
         icon: <img src={code} alt={'code'}/>,
         type: 'customs'
      },
		{
         label: '+Теги',
         icon: <img src={tags} alt={'code'}/>,
         type: 'tags'
      },
		{
         label: '+Ссылка',
         icon: <img src={sendLink} alt={'code'}/>,
         type: 'sendLink'
      }
   ],
   vk: [
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
      },
      {
         label: '+Геоданные',
         icon: <img src={location} alt={'location'}/>,
         type: 'location'
      },
      {
         label: '+Оплата ',
         icon: <img src={payment} alt={'payment'}/>,
         type: 'payment'
      },
      {
         label: '+Код ',
         icon: <img src={code} alt={'code'}/>,
         type: 'customs'
      },
		{
         label: '+Теги',
         icon: <img src={tags} alt={'code'}/>,
         type: 'tags'
      },
		{
         label: '+Ссылка',
         icon: <img src={sendLink} alt={'code'}/>,
         type: 'sendLink'
      }
   ],
   whatsapp: [
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
         label: '+Геоданные',
         icon: <img src={location} alt={'location'}/>,
         type: 'location'
      },
      {
         label: '+Оплата ',
         icon: <img src={payment} alt={'payment'}/>,
         type: 'payment'
      },
      {
         label: '+Отправть контакт ',
         icon: <img src={contact} alt={'contact'}/>,
         type: 'contact'
      },
      {
         label: '+Код ',
         icon: <img src={code} alt={'code'}/>,
         type: 'customs'
      },
		{
         label: '+Теги',
         icon: <img src={tags} alt={'code'}/>,
         type: 'tags'
      },
		{
         label: '+Ссылка',
         icon: <img src={sendLink} alt={'code'}/>,
         type: 'sendLink'
      }
   ]
};
