import React, {Fragment, useEffect, useState} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Modal, Upload, Input, message} from "antd";
import {InboxOutlined} from "@ant-design/icons";

import {userAccessToken} from "../../../utils/userToken";
import {
   moduleName as statisticsModule,
   exportUsers, importUsers, resetExportedUsers
} from "../../../ducks/Statistics";

import nloImg from '../../../images/statistics/alien_abduction_icon-icons.com_60295.png';
import alienSadImg from '../../../images/statistics/alien_sad_icon-icons.com_60288.png';
import alienSmileImg from '../../../images/statistics/alien_icon-icons.com_60286.png';
import csvExport from '../../../images/statistics/export-csv.png';

const {Dragger} = Upload;

const StatisticsInfo = ({tabs, activeTab, statistics, exportUsers, exportedUsers, loadingOfExport, match, resetExportedUsers, loadingOfImport}) => {
   const [visible, setVisible] = useState(false);
   const [field, setField] = useState('');

   const exportedSocial = tabs[activeTab];

   useEffect(() => {
      if (Object.keys(exportedUsers).length !== 0) {
         window.open(exportedUsers.filename);
         resetExportedUsers();
      }
   }, [exportedUsers]);

   function beforeUpload(file) {
      const regex = new RegExp("(.*?)\.(csv)$");

      if (!(regex.test(file.name.toLowerCase()))) {
         message.error('Вы можете загрузить только CSV файл!');
      }

      return (regex.test(file.name.toLowerCase()));
   }

   let applications = 'Загрузка...';
   let subscribers = 'Загрузка...';
   let unSubscribers = 'Загрузка...';

   const showModal = () => setVisible(true);
   const handleCancel = () => setVisible(false);
   const handleOk = () => setVisible(false);

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

            unSubscribers =
               statistics.facebook.unsubscribers +
               statistics.telegram.unsubscribers +
               statistics.vk.unsubscribers +
               statistics.whatsapp.unsubscribers;
            break;

         case 1:
            applications = statistics.facebook.applications;
            subscribers = statistics.facebook.subscribers;
            unSubscribers = statistics.facebook.unsubscribers;
            break;

         case 2:
            applications = statistics.telegram.applications;
            subscribers = statistics.telegram.subscribers;
            unSubscribers = statistics.telegram.unsubscribers;
            break;

         case 3:
            applications = statistics.vk.applications;
            subscribers = statistics.vk.subscribers;
            unSubscribers = statistics.vk.unsubscribers;
            break;

         case 4:
            applications = statistics.whatsapp.applications;
            subscribers = statistics.whatsapp.subscribers;
            unSubscribers = statistics.whatsapp.unsubscribers;
            break;

         default:
            applications = ''
      }
   } else {
      applications = 'Загрузка...';
      subscribers = 'Загрузка...';
      unSubscribers = 'Загрузка...';
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
                     {unSubscribers}
                  </p>
               </div>
            </div>
         </div>

         <div className="statistics-info-export">
            <Button
               className="statistics-info-export__btn"
               disabled={activeTab === 0 || loadingOfExport}
               href=""
               onClick={() => exportUsers({
                  botId: match.params.botId,
                  messenger: exportedSocial.name === 'ВКонтакте' ? 'vk' : exportedSocial.name.toLowerCase()
               })}
            >
               {loadingOfExport
                  ? <CircularProgress color="white"/>
                  : (
                     <Fragment>
                        Экспорт аудитории
                        <img src={csvExport} alt=""/>
                     </Fragment>
                  )}
            </Button>

            <Button
               className="statistics-info-export__btn"f
               disabled={activeTab === 0 || loadingOfImport}
               href=""
               onClick={showModal}
            >
               {loadingOfImport
                  ? <CircularProgress color="white"/>
                  : (
                     <Fragment>
                        Импорт аудитории
                        <img src={csvExport} alt=""/>
                     </Fragment>
                  )}
            </Button>

            <p className="statistics-info-export__social">
               {exportedSocial.name}
            </p>
         </div>

         <Modal
            title="Импорт аудитории"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            <p className="statistics-info-import-field">Название поля</p>
            <Input
               value={field}
               style={{marginBottom: '20px'}}
               onChange={e => setField(e.target.value)}
               placeholder="Введите название поля user_id в csv"
            />
            <Dragger
               name="file"
               multiple={false}
               disabled={field.length === 0}
               beforeUpload={beforeUpload}
               action="https://api.chatlead.io/app/api/ImportUsers/"
               data={(file) => ({
                  user_token: userAccessToken(),
                  bot_id: match.params.botId,
                  messenger: exportedSocial.name === 'ВКонтакте' ? 'vk' : exportedSocial.name.toLowerCase(),
                  filename: file.name,
                  user_id_field: field
               })}
               onChange={info => {
                  const { status } = info.file;

                  if (status === 'done') {
                     message.success(`${info.file.name} Файл успешно загружен.`);
                  } else if (status === 'error') {
                     message.error(`${info.file.name} Не удалось загрузить файл.`);
                  }
               }}
            >
               <p className="ant-upload-drag-icon">
                  <InboxOutlined />
               </p>
               <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить</p>
               <p className="ant-upload-hint">
                  Поддержка только CSV файлов.
               </p>
            </Dragger>
         </Modal>
      </div>
   );
};

const mapStateToProps = state => ({
   statistics: state[statisticsModule].statistics,

   loadingOfStatistics: state[statisticsModule].loadingOfStatistics,
   exportedUsers: state[statisticsModule].exportedUsers,
   loadingOfExport: state[statisticsModule].loadingOfExport,

   loadingOfImport: state[statisticsModule].loadingOfImport,
   importedUsers: state[statisticsModule].importedUsers,
});

const mapDispatchToProps = {
   exportUsers, resetExportedUsers, importUsers
};

export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   withRouter
)(StatisticsInfo);
