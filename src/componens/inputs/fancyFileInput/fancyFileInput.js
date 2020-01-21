import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Spin} from "antd";

import {staticMedia} from "../../../config/service/service";
import HoverBarForMessage from "../../messages/hoverBarForMessage/hoverBarForMessage";
import ConditionsForElements from "../../messages/conditionsForElements/conditionsForElements";

import style from './fancyFileInput.module.sass';

const FancyFileInput = props => {
   const {accept, onChange, index, pictureForLabel, value, type, loadingOfTrigger} = props;

   const [loading, setLoading] = useState(false);
   const [sizeError, setSizeError] = useState('');
   
   const pathFile = value[type];
   let nameFile = pathFile ? pathFile.split('/')[pathFile.split('/').length - 1] : '';

   if (pictureForLabel.label === 'Image') {
      nameFile = <img src={staticMedia + pathFile} alt={nameFile}/>
   }

   useEffect(() => {
      if (pathFile.length !== 0) {
         setLoading(false);
      }
   }, [pathFile])

   return (
      <div className={style.mainContainer}>
			<ConditionsForElements/>

         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>
         {pathFile !== undefined ? (
            <div>
               <Spin spinning={loading}>
                  <input
                     type={'file'}
                     accept={accept}
                     name={index}
                     id={index}
                     onChange={e => {
                        setLoading(true);

                        if (e.target.files.length !== 0) {
                           if (e.target.files[0].size <= 3500000) {
                              onChange(e);
                              setSizeError('')
                           } else {
                              setSizeError('Размер файла слишком велик')
                           }
                        }
                     }}
                     className={style.inputFile}
                  />
                  <label htmlFor={index}>
                     <div className={`${style.pictureContainer} ${pathFile.length === 0 && style.spaces}`}>
                        <h2>{pathFile.length !== 0 ? nameFile : pictureForLabel.img}</h2>
                        <p>{pathFile.length === 0 && pictureForLabel.label}</p>
                     </div>
                  </label>

                  <p className={style.sizeError}>
                     {sizeError.length !== 0 && sizeError}
                  </p>
               </Spin>
            </div>
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

export default connect(({singleBotReducers}) => ({
   loadingOfTrigger: singleBotReducers.loadingOfTrigger,
}))(FancyFileInput);