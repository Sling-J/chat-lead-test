import React from 'react';
import style from './fancyFileInput.module.sass';
import {staticMedia} from "../../../api/baseURL";
// import ButtonsContainer from "../../messages/hoverBarForMessage/hoverBarForMessage";
import HoverBarForMessage from "../../messages/hoverBarForMessage/hoverBarForMessage";


const FancyFileInput = (props) => {
   const {type, accept, onChange, index, pictureForLabel, value, changedTrigger} = props;
   const pathFile = Object.values(value)[0];
   let nameFile = pathFile.split('/')[pathFile.split('/').length - 1];

   if (pictureForLabel.label === 'image') {
      nameFile = <img src={staticMedia + pathFile} alt={nameFile}/>
   }


   return (
      <div className={style.mainContainer}>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
               styleForBar={{top: '0', left: '328px'}}
            />
         </div>
         <input type={'file'} accept={accept} name={index} id={index} onChange={onChange} className={style.inputFile}/>
         <label htmlFor={index}>
            <div className={style.pictureContainer}>
               <h2>{pathFile.length > 0 ? nameFile : pictureForLabel.img}</h2>
               <p>{pathFile.length === 0 && pictureForLabel.label}</p>
            </div>
         </label>
         {/*<ButtonsContainer*/}
         {/*{...props}*/}
         {/*/>*/}
      </div>
   )
};

export default FancyFileInput;
