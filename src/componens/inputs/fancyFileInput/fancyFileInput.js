import React, {useState} from 'react';
import style from './fancyFileInput.module.sass';
import {staticMedia} from "../../../api/baseURL";
import HoverBarForMessage from "../../messages/hoverBarForMessage/hoverBarForMessage";

const FancyFileInput = (props) => {
   const [sizeError, setSizeError] = useState('');

   const {accept, onChange, index, pictureForLabel, value} = props;
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
         <input
            type={'file'}
            accept={accept}
            name={index}
            id={index}
            onChange={(e) => {
               if (e.target.files[0].size <= 3500000) {
                  onChange(e);
                  setSizeError('')
               } else {
                  setSizeError('Размер файла слишком велик')
               }
            }}
            className={style.inputFile}
         />
         <label htmlFor={index}>
            <div className={style.pictureContainer}>
               <h2>{pathFile.length > 0 ? nameFile : pictureForLabel.img}</h2>
               <p>{pathFile.length === 0 && pictureForLabel.label}</p>
            </div>
         </label>

         <p className={style.sizeError}>
            {sizeError.length !== 0 && sizeError}
         </p>
      </div>
   )
};

export default FancyFileInput;
