import React from 'react';
import style from './miniImagesForSlider.module.sass';
import {staticMedia} from "../../../../config/service/service";
import card from "../../../../images/buttons/card.png";

const MiniImagesForSlider = ({value, changeSlide, changedSlide}) => (
   <div className={style.miniImagesContainer}>
      {
         value.map((elem, index) => (
            elem.photo ? (
               <img
                  src={staticMedia + elem.photo}
                  alt={elem.photo}
                  onClick={() => changeSlide(index)}
                  style={index === changedSlide ? {border: '1px solid green'} : {}}
               />
            ) : (
               <img
                  src={card}
                  alt={'card'}
                  onClick={() => changeSlide(index)}
                  style={index === changedSlide ? {border: '1px solid green'} : {}}
               />
            )

         ))
      }
   </div>
);

export default MiniImagesForSlider;
