import React from 'react';

import Button from '@material-ui/core/Button';

import nloImg from '../../../images/statistics/alien_abduction_icon-icons.com_60295.png';
import alienSmileImg from '../../../images/statistics/alien_icon-icons.com_60286.png';
import alienSadImg from '../../../images/statistics/alien_sad_icon-icons.com_60288.png';
import csvExport from '../../../images/statistics/export-csv.png';

const StatisticsInfo = () => {
   return (
      <div className="statistics-info">
         <div className="statistics-info-box">
            <div className="statistics-info-box__item pv1-flex pv1-flex-align-center">
               <div className="statistics-info-box-item__icon">
                  <img src={nloImg} alt="statistics"/>
               </div>

               <div className="statistics-info-box-item__info">
                  <h2 className="statistics-info-box-item-info__title">
                     Заявки
                  </h2>
                  <p className="statistics-info-box-item-info__desc">
                     {/*17 890*/}
                     Скоро!
                  </p>
               </div>
            </div>

            <div className="statistics-info-box__item pv1-flex pv1-flex-align-center">
               <div className="statistics-info-box-item__icon">
                  <img src={alienSmileImg} alt="statistics"/>
               </div>

               <div className="statistics-info-box-item__info">
                  <h2 className="statistics-info-box-item-info__title">
                     Подписок
                  </h2>
                  <p className="statistics-info-box-item-info__desc">
                     {/*29 870*/}
                     Скоро!
                  </p>
               </div>
            </div>

            <div className="statistics-info-box__item pv1-flex pv1-flex-align-center">
               <div className="statistics-info-box-item__icon">
                  <img src={alienSadImg} alt="statistics"/>
               </div>

               <div className="statistics-info-box-item__info">
                  <h2 className="statistics-info-box-item-info__title">
                     Отписок
                  </h2>
                  <p className="statistics-info-box-item-info__desc">
                     {/*19*/}
                     Скоро!
                  </p>
               </div>
            </div>
         </div>

         <div className="statistics-info-export">
            <Button className="statistics-info-export__btn">
               Экспорт аудитории

               <img src={csvExport} alt=""/>
            </Button>

            <p className="statistics-info-export__social">
               Facebook Messenger
            </p>
         </div>
      </div>
   );
};

export default StatisticsInfo;
