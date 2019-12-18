import React from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';

import nloImg from '../../../images/statistics/alien_abduction_icon-icons.com_60295.png';
import alienSmileImg from '../../../images/statistics/alien_icon-icons.com_60286.png';
import alienSadImg from '../../../images/statistics/alien_sad_icon-icons.com_60288.png';
import csvExport from '../../../images/statistics/export-csv.png';

const StatisticsInfo = ({tabs, activeTab, statistics}) => {
   const exportedSocial = tabs[activeTab];

   let applications = 'Загрузка...';
   let subscribers = 'Загрузка...';

   if (Object.keys(statistics).length !== 0) {
      switch (activeTab) {
         case 0:
            applications =
               statistics.facebook.applications +
               statistics.telegram.applications +
               statistics.vk.applications +
               statistics.whatsapp.applications;

            subscribers =
               statistics.facebook.subscribers +
               statistics.telegram.subscribers +
               statistics.vk.subscribers +
               statistics.whatsapp.subscribers;
            break;

         case 1:
            applications = statistics.facebook.applications;
            subscribers = statistics.facebook.subscribers;
            break;

         case 2:
            applications = statistics.telegram.applications;
            subscribers = statistics.telegram.subscribers;
            break;

         case 3:
            applications = statistics.vk.applications;
            subscribers = statistics.vk.subscribers;
            break;

         case 4:
            applications = statistics.whatsapp.applications;
            subscribers = statistics.whatsapp.subscribers;
            break;

         default:
            applications = ''
      }
   } else {
      applications = 'Загрузка...';
      subscribers = 'Загрузка...';
   }

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
                     {applications}
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
                     {subscribers}
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
            <Button className="statistics-info-export__btn" disabled href="">
               Экспорт аудитории
               <img src={csvExport} alt=""/>
            </Button>

            <p className="statistics-info-export__social">
               {exportedSocial.name}
            </p>
         </div>
      </div>
   );
};

export default connect(({botStatisticsReducer}) => ({
   statistics: botStatisticsReducer.statistics,
   loadingOfStatistics: botStatisticsReducer.loadingOfStatistics
}))(StatisticsInfo);
