import React from 'react';
import FancyFileInput from "../../componens/inputs/fancyFileInput/fancyFileInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faVolumeDown, faVideo} from "@fortawesome/free-solid-svg-icons";
import CardOrGalleryEllement from '../../componens/messages/cardOrGalleryElement/cardOrGalleryElement';
import ListElement from '../../componens/messages/listElement/listElement';
import FormElement from '../../componens/messages/formElement/formElement';
import TimerElement from '../../componens/messages/timerElement/timerElement';
import TextArea from '../../componens/messages/textArea/textArea';
import TypeProcessing from '../../componens/messages/typeProcessing/typeProcessing';
import PaymentElement from "../../componens/messages/paymentElement/paymentElement";

export const fileDefinition = (key, value, handler, index, deleteHandler, changedTrigger, changedScenario, changeTriggerId) => {
   if (key === 'text') {
      return (
         <TextArea
            type={'text'}
            value={value}
            handler={handler}
            index={index}
            changedTrigger={changedTrigger}
            key={key}
            componentType={'text'}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
         />
      )
   } else if (key === 'audio') {
      return (
         <FancyFileInput
            type={'audio'}
            index={index}
            pictureForLabel={{
               label: 'audio',
               img: <FontAwesomeIcon icon={faVolumeDown}/>
            }}
            value={value}
            accept={'audio/*'}
            onChange={(e) => handler(e, index, key)}
            changedTrigger={changedTrigger}
            changedScenario
         />

      )
   } else if (key === 'video') {
      return (
         <FancyFileInput
            type={'video'}
            index={index}
            pictureForLabel={{
               label: 'video',
               img: <FontAwesomeIcon icon={faVideo}/>
            }}
            value={value}
            accept={'video/*'}
            onChange={(e) => handler(e, index, key)}
            changedTrigger={changedTrigger}
            changedScenario
         />

      )
   } else if (key === 'photo') {
      return (
         <FancyFileInput
            type={'photo'}
            index={index}
            pictureForLabel={{
               label: 'image',
               img: <FontAwesomeIcon icon={faImage}/>
            }}
            accept={'image/*'}
            value={value}
            onChange={(e) => handler(e, index, key)}
            changedTrigger={changedTrigger}
            changedScenario
         />

      )
   } else if (key === 'card') {
      return (
         <CardOrGalleryEllement
            type={'card'}
            index={index}
            pictureForLabel={{
               label: 'image',
               img: <FontAwesomeIcon icon={faImage}/>
            }}
            changedTrigger={changedTrigger}
            value={Object.values(value)[0]}
            onChange={(e) => handler(e, index, key)}
            changedScenario
         />
      )
   } else if (key === 'gallery') {
      return (
         <CardOrGalleryEllement
            type={'gallery'}
            index={index}
            pictureForLabel={{
               label: 'image',
               img: <FontAwesomeIcon icon={faImage}/>
            }}
            changedTrigger={changedTrigger}
            value={Object.values(value)[0]}
            onChange={(e) => handler(e, index, key)}
            changedScenario
         />
      )

   } else if (key === 'list') {
      return (
         <ListElement
            type={'list'}
            index={index}
            pictureForLabel={{
               label: 'image',
               img: <FontAwesomeIcon icon={faImage}/>
            }}
            changedTrigger={changedTrigger}
            value={Object.values(value)[0]}
            onChange={(e) => handler(e, index, key)}
            changedScenario
         />
      )
   } else if (key === 'form') {
      return (
         <FormElement
            type={'form'}
            index={index}
            changedTrigger={changedTrigger}
            value={value}
            onChange={(e) => handler(e, index, key)}
            changedScenario
         />
      )
   } else if (key === 'timer') {
      return (
         <TimerElement
            type={'timer'}
            index={index}
            handler={handler}
            changedTrigger={changedTrigger}
            key={key}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
            value={value}
            onChange={(e) => handler(e, index, key)}
         />
      )
   } else if (key === 'type_processing') {
      return (
         <TypeProcessing
            type={'type_processing'}
            index={index}
            changedTrigger={changedTrigger}
            value={value}
            onChange={(e) => handler(e, index, key)}
         />
      )
   } else if (key === 'location') {
      return (
         <FormElement
            soon
            type={'form'}
            index={index}
            changedTrigger={changedTrigger}
            value={value}
            onChange={(e) => handler(e, index, key)}
            changedScenario
         />
      )
   } else if (key === 'contact') {
      return (
         <FormElement
            soon
            type={'form'}
            index={index}
            changedTrigger={changedTrigger}
            value={value}
            onChange={(e) => handler(e, index, key)}
            changedScenario
         />
      )
   } else if (key === 'payment') {
      return (
         <PaymentElement
            type={'payment'}
            value={value}
            handler={handler}
            index={index}
            key={key}
            changedTrigger={changedTrigger}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
         />
      )
   }
};
