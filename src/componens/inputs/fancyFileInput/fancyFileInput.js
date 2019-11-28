import React from 'react';
import style from './fancyFileInput.module.sass';
import {staticMedia} from "../../../api/baseURL";
import HoverBarForMessage from "../../messages/hoverBarForMessage/hoverBarForMessage";

const FancyFileInput = (props) => {
   const { accept, onChange, index, pictureForLabel, value} = props;
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
            />
         </div>
         <input type={'file'} accept={accept} name={index} id={index} onChange={onChange} className={style.inputFile}/>
         <label htmlFor={index}>
            <div className={style.pictureContainer}>
               <h2>{pathFile.length > 0 ? nameFile : pictureForLabel.img}</h2>
               <p>{pathFile.length === 0 && pictureForLabel.label}</p>
            </div>
         </label>
      </div>
   )
};

export default FancyFileInput;
