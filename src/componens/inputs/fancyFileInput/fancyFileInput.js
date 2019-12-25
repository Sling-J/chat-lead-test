import React, {Fragment, useState} from 'react';
import {Spin} from "antd";

import {staticMedia} from "../../../config/service/service";
import HoverBarForMessage from "../../messages/hoverBarForMessage/hoverBarForMessage";

import style from './fancyFileInput.module.sass';

const FancyFileInput = (props) => {
   const [sizeError, setSizeError] = useState('');

   const {accept, onChange, index, pictureForLabel, value} = props;
   const pathFile = Object.values(value)[0];
   let nameFile = pathFile ? pathFile.split('/')[pathFile.split('/').length - 1] : '';

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
         {pathFile !== undefined ? (
            <Fragment>
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
            </Fragment>
         ) : (
            <Spin spinning={pathFile}>
               <input
                  id={index}
                  className={style.inputFile}
               />
               <label htmlFor={index}>
                  <div className={style.pictureContainer}>
                     <p style={{margin: '0 0 15px'}}>Ошибка загрузки!</p>
                     <h2 style={{fontSize: '17px'}}>Установите компонент заново</h2>
                  </div>
               </label>
            </Spin>
         )}
      </div>
   )
};

export default FancyFileInput;
