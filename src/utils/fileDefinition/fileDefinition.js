import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faVolumeDown, faVideo, faPaperclip} from "@fortawesome/free-solid-svg-icons";

import CardOrGalleryEllement from '../../componens/messages/cardOrGalleryElement/cardOrGalleryElement';
import ListElement from '../../componens/messages/listElement/listElement';
import FormElement from '../../componens/messages/formElement/formElement';
import ContactsElement from '../../componens/messages/contactsElement/contactsElement';
import TimerElement from '../../componens/messages/timerElement/timerElement';
import TextArea from '../../componens/messages/textArea/textArea';
import TypeProcessing from '../../componens/messages/typeProcessing/typeProcessing';
import PaymentElement from "../../componens/messages/paymentElement/paymentElement";
import FancyFileInput from "../../componens/inputs/fancyFileInput/fancyFileInput";
import CodeElement from "../../componens/messages/codeElement/codeElement";
import TagsElement from "../../componens/messages/tagsElement/tagsElement";
import SendLinkElement from "../../componens/messages/sendLinkElement/sendLinkElement";

export const fileDefinition = (key, value, handler, index, deleteHandler, changedTrigger, changedScenario, changeTriggerId) => {
   if (key === 'text') {
      return (
         <TextArea
            type={'text'}
            value={value}
            tagsValue={value}
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
            tagsValue={value}
            pictureForLabel={{
               label: 'Audio',
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
            tagsValue={value}
            pictureForLabel={{
               label: 'Video',
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
            tagsValue={value}
            pictureForLabel={{
               label: 'Image',
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
            value={Object.values(value)[0]}
            tagsValue={value}
            conditionalsValue={value}
            onChange={(e) => handler(e, index, key)}
            index={index}
            key={key}
            pictureForLabel={{
               label: 'image',
               img: <FontAwesomeIcon icon={faImage}/>
            }}
            changedTrigger={changedTrigger}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
         />
      )
   } else if (key === 'gallery') {
      return (
         <CardOrGalleryEllement
            type={'gallery'}
            value={Object.values(value)[0]}
            tagsValue={value}
            onChange={(e) => handler(e, index, key)}
            conditionalsValue={value}
            index={index}
            key={key}
            pictureForLabel={{
               label: 'image',
               img: <FontAwesomeIcon icon={faImage}/>
            }}
            changedTrigger={changedTrigger}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
         />
      )
   } else if (key === 'sendLink') {
      return (
         <SendLinkElement
            type={'sendLink'}
            value={value}
            tagsValue={value}
            onChange={(e) => handler(e, index, key)}
            index={index}
            key={key}
            changedTrigger={changedTrigger}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
         />
      )
   } else if (key === 'list') {
      return (
         <ListElement
            type={'list'}
            index={index}
            tagsValue={value}
            pictureForLabel={{
               label: 'image',
               img: <FontAwesomeIcon icon={faImage}/>
            }}
            changedTrigger={changedTrigger}
            value={Object.values(value)[0]}
            conditionValue={value}
            onChange={(e) => handler(e, index, key)}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
            key={key}
         />
      )
   } else if (key === 'form') {
      return (
         <FormElement
            type={'form'}
            index={index}
            tagsValue={value}
            changedTrigger={changedTrigger}
            value={value}
            onChange={(e) => handler(e, index, key)}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
            key={key}
         />
      )
   } else if (key === 'timer') {
      return (
         <TimerElement
            type={'timer'}
            index={index}
            tagsValue={value}
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
            tagsValue={value}
            changedTrigger={changedTrigger}
            value={value}
            onChange={(e) => handler(e, index, key)}
         />
      )
   } else if (key === 'updateTag') {
      return (
         <TagsElement
            type={'updateTag'}
            index={index}
            value={value}
            tagsValue={value}
            changedTrigger={changedTrigger}
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
            tagsValue={value}
            onChange={(e) => handler(e, index, key)}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
            key={key}
         />
      )
   } else if (key === 'customs') {
      return (
         <CodeElement
            type={'customs'}
            index={index}
            changedTrigger={changedTrigger}
            value={value}
            tagsValue={value}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
            key={key}
         />
      )
   } else if (key === 'contact') {
      return (
         <ContactsElement
            type={'contact'}
            index={index}
            changedTrigger={changedTrigger}
            value={value}
            onChange={handler}
            tagsValue={value}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
            key={key}
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
            tagsValue={value}
            changedTrigger={changedTrigger}
            changedScenario={changedScenario}
            changeTriggerId={changeTriggerId}
         />
      )
   } else {
      return (
         <FancyFileInput
            type={'file'}
            index={index}
            pictureForLabel={{
               label: 'File',
               img: <FontAwesomeIcon icon={faPaperclip}/>
            }}
            value={value}
            tagsValue={value}
            onChange={(e) => handler(e, index, key)}
            changedTrigger={changedTrigger}
            changedScenario
         />
      )
   }
};
