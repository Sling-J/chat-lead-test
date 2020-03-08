import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {getAllAutorides} from "../../../actions/actionCreator";

import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import {Modal, Spin} from "antd";
import {useTheme} from '@material-ui/core/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faFileAlt, faCode, faCheck} from "@fortawesome/free-solid-svg-icons";

import GrowthToolMlpSettings from "./growthToolMLPSettings";
import GrowthToolMlpContent from "./growthToolMLPContent";
import GrowthToolMlpResult from "./growthToolMLPResult";
import GrowthToolMlpCode from "./growthToolMLPCode";

import {
   moduleName as growthToolModule,
   createMLP, refreshMLPData, getMLP, getUserMLP, defaultMLPSettings, updateMLP
} from "../../../ducks/GrowthTool";

const TabPanel = props => {
   const {value, index} = props;

   return value === index && (
      <p className="mlp-carousel">
         {index === 0 ? (
            <GrowthToolMlpSettings {...props}/>
         ) : index === 1 ? (
            <GrowthToolMlpContent {...props}/>
         ) : index === 2 ? (
            <GrowthToolMlpCode {...props}/>
         ) : index === 3 ? (
            <GrowthToolMlpResult {...props}/>
         ) : null}
      </p>
   )
};

const GrowthToolMlp = ({
   setPage, getMLP, getUserMLP,
   autoRidesData, getAutorides, match,
   loadingOfAutoRides, mlpId, createMLP,
   refreshMLPData, createdMLP, loadingOfCreation,
   loadingOfUpdating, updatedMLP, userMLP,
   loadingOfUserMLP, updateMLP
}) => {
   const theme = useTheme();

   const [value, setValue] = useState(0);
   const [radioTab, setRadioTab] = useState(1);
   const [firstSectionTabs, setFirstSectionTabs] = useState(1);
   const [secondSectionTabs, setSecondSectionTabs] = useState(2);

   // Mlp Settings
   const [settingTitle, setSettingTitle] = useState('');
   const [selectedAutoRide, setSelectedAutoRide] = useState(undefined);

   // Mlp Content
   const [imageUrl, setImageUrl] = useState('');
   const [youtubeField, setYoutubeField] = useState('');
   const [description1, setDescription1] = useState('');
   const [description2, setDescription2] = useState('');
   const [actionText, setActionText] = useState('ШАГ - 1. Выберите Свой Мессенджер');
   const [phone1, setPhone1] = useState('');
   const [phone2, setPhone2] = useState('');

   let socialList = [];

   // Mlp Code
   const [scriptForHead, setScriptForHead] = useState('');
   const [scriptForBody, setScriptForBody] = useState('');

   useEffect(() => {
      getAutorides(match.params.botId);

      if (mlpId) {
         getUserMLP({
            botId: match.params.botId,
            mlpId: mlpId
         });
      } else {
         refreshMLPData();
         refreshData();
      }
   }, []);

   useEffect(() => {
      if (Object.keys(userMLP).length !== 0 && mlpId) {
         setSettingTitle(userMLP.settings.title);
         setSelectedAutoRide(userMLP.settings.autoride_id);
         setImageUrl(userMLP.content.media.image);
         setYoutubeField(userMLP.content.media.video);
         setDescription1(userMLP.content.description.firstSection.title);
         setPhone1(userMLP.content.description.firstSection.phone);
         setDescription2(userMLP.content.description.secondSection.title);
         setPhone2(userMLP.content.description.secondSection.phone);
         setActionText(userMLP.content.description.actionTitle);
         socialList = JSON.parse(userMLP.content.socialList);

         if (userMLP.content.media.image) {
            setRadioTab(1);
         } else if (userMLP.content.media.video.length !== 0) {
            setRadioTab(2);
         }

         if (userMLP.content.description.firstSection.title.length !== 0) {
            setFirstSectionTabs(1);
         } else {
            setFirstSectionTabs(2);
         }

         if (userMLP.content.description.secondSection.title.length !== 0) {
            setSecondSectionTabs(1);
         } else {
            setSecondSectionTabs(2);
         }
      }
   }, [userMLP]);

   useEffect(() => {
      if (Object.keys(createdMLP).length !== 0) {
         setValue(3);
      }
   }, [createdMLP]);

   useEffect(() => {
      if (Object.keys(updatedMLP).length !== 0) {
         setValue(3);
         // setPage(0);
      }
   }, [updatedMLP]);

   let disabled = true;

   function refreshData() {
      setSettingTitle('');
      setSelectedAutoRide(undefined);
      setImageUrl('');
      setYoutubeField('');
      setDescription1('');
      setPhone1('');
      setDescription2('');
      setPhone2('');
      setActionText('ШАГ - 1. Выберите Свой Мессенджер');
      socialList = [];
      setRadioTab(1);
      setFirstSectionTabs(1);
      setSecondSectionTabs(2);
   }

   function warning() {
      Modal.warning({
         title: 'Предупреждение',
         content: 'Вы не заполнили нужные поля',
      });
   }

   const handleChange = (value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };

   if (
      (youtubeField.length !== 0 || imageUrl && imageUrl.length !== 0) &&
      (description1.length !== 0 || description2.length !== 0) &&
      (actionText && actionText.length !== 0) && (selectedAutoRide) && (settingTitle.length !== 0)
   ) {
      disabled = false;
   }

   const requestData = {
      botId: match.params.botId,
      data: defaultMLPSettings(
         mlpId, settingTitle,
         selectedAutoRide,
         socialList, imageUrl,
         youtubeField, description1,
         phone1, description2,
         phone2, actionText,
         scriptForHead, scriptForBody,
      ),
   };

   return (
      <div className="mlp-container">
         <div className="mlp-nav pv1-flex pv1-j-sb pv1-flex-align-center">
            <Button
               onClick={() => {
                  getMLP(match.params.botId);
                  setPage(0);
               }}
               className="mlp-nav__back"
               variant="contained"
            >
               Назад к лидгентулам
            </Button>
            <Button
               className="mlp-nav__next"
               variant="contained"
               onClick={() => {
                  if (value === 2 && disabled) {
                     warning();
                  } else {
                     if (value === 2) {
                        !mlpId
                           ? createMLP(requestData)
                           : updateMLP(requestData);
                     } else if (value !== 3) {
                        setValue(value === 0 ? 1 : value === 1 ? 2 : 0);
                     } else {
                        getMLP(match.params.botId);
                        setPage(0);
                        // mlpId
                        //    ? updateMLP(requestData)
                        //    : setPage(0);
                     }
                  }
               }}
            >
               {value === 3 ? 'Сохранить' : 'Дальше'}
            </Button>
         </div>

         <Spin spinning={loadingOfUserMLP}>
            <div className="mlp-body">
               <div className="mlp-body-nav">
                  <ul className="mlp-body-nav__menu pv1-flex pv1-j-sb pv1-flex-align-center">
                     <li className={`mlp-body-nav-menu__item ${value === 0 && 'mlp-body-nav-menu__item-active'}`}
                         onClick={() => handleChange(0)}>
                        <FontAwesomeIcon className="mlp-body-nav-menu-item__icon" icon={faCog}/>
                        Основные настройки
                     </li>
                     <li className={`mlp-body-nav-menu__item ${value === 1 && 'mlp-body-nav-menu__item-active'}`}
                         onClick={() => handleChange(1)}>
                        <FontAwesomeIcon className="mlp-body-nav-menu-item__icon" icon={faFileAlt}/>
                        Содержимое
                     </li>
                     <li className={`mlp-body-nav-menu__item ${value === 2 && 'mlp-body-nav-menu__item-active'}`}
                         onClick={() => handleChange(2)}>
                        <FontAwesomeIcon className="mlp-body-nav-menu-item__icon" icon={faCode}/>
                        Код
                     </li>
                     <li className={`mlp-body-nav-menu__item ${value === 3 && 'mlp-body-nav-menu__item-active'}`}
                         onClick={() => disabled ? warning() : handleChange(3)}>
                        <FontAwesomeIcon className="mlp-body-nav-menu-item__icon" icon={faCheck}/>
                        Готово
                     </li>
                  </ul>
               </div>

               <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
               >
                  <TabPanel
                     value={value}
                     index={0}
                     settingTitle={settingTitle}
                     setSettingTitle={setSettingTitle}
                     autoRidesData={autoRidesData}
                     setSelectedAutoRide={setSelectedAutoRide}
                     selectedAutoRide={selectedAutoRide}
                     loadingOfAutoRides={loadingOfAutoRides}
                     loadingOfUserMLP={loadingOfUserMLP}
                  />

                  <TabPanel
                     value={value}
                     index={1}
                     selectedAutoRide={selectedAutoRide}
                     youtubeField={youtubeField}
                     setYoutubeField={setYoutubeField}
                     description1={description1}
                     setDescription1={setDescription1}
                     phone1={phone1}
                     setPhone1={setPhone1}
                     description2={description2}
                     setDescription2={setDescription2}
                     phone2={phone2}
                     setPhone2={setPhone2}
                     actionText={actionText}
                     setActionText={setActionText}
                     setImageUrl={setImageUrl}
                     imageUrl={imageUrl}
                     firstSectionTabs={firstSectionTabs}
                     setFirstSectionTabs={setFirstSectionTabs}
                     secondSectionTabs={secondSectionTabs}
                     setSecondSectionTabs={setSecondSectionTabs}
                     setPage={setValue}
                     radioTab={radioTab}
                     setRadioTab={setRadioTab}
                     setSocialList={socialList}
                  />

                  <TabPanel
                     value={value}
                     index={2}
                     scriptForHead={scriptForHead}
                     setScriptForHead={setScriptForHead}
                     scriptForBody={scriptForBody}
                     setScriptForBody={setScriptForBody}
                     selectedAutoRide={selectedAutoRide}
                     description1={description1}
                     setPhone1={setPhone1}
                     setPhone2={setPhone2}
                     phone1={phone1}
                     description2={description2}
                     phone2={phone2}
                     actionText={actionText}
                     firstSectionTabs={firstSectionTabs}
                     setFirstSectionTabs={setFirstSectionTabs}
                     secondSectionTabs={secondSectionTabs}
                     setSecondSectionTabs={setSecondSectionTabs}
                     setPage={setValue}
                     setSocialList={socialList}
                     loadingOfCreation={loadingOfCreation}
                     imageUrl={imageUrl}
                  />

                  <TabPanel
                     value={value}
                     index={3}
                     firstSectionTabs={firstSectionTabs}
                     secondSectionTabs={secondSectionTabs}
                     selectedAutoRide={selectedAutoRide}
                     disabled={disabled}
                     description1={description1}
                     actionText={actionText}
                     phone2={phone2}
                     phone1={phone1}
                     setPhone1={setPhone1}
                     setPhone2={setPhone2}
                     description2={description2}
                     setPage={setValue}
                     setSocialList={socialList}
                     mlpId={mlpId}
                     loadingOfUpdating={loadingOfUpdating}
                     imageUrl={imageUrl}
                  />
               </SwipeableViews>
            </div>
         </Spin>
      </div>
   );
};

const mapStateToProps = state => ({
   autoRidesData: state.autoridesReducers.autoridesData,
   loadingOfAutoRides: state.autoridesReducers.loadingOfAutoRides,
   loadingOfCreation: state[growthToolModule].loadingOfCreation,
   loadingOfUpdating: state[growthToolModule].loadingOfUpdating,
   loadingOfUserMLP: state[growthToolModule].loadingOfUserMLP,
   createdMLP: state[growthToolModule].createdMLP,
   updatedMLP: state[growthToolModule].updatedMLP,
   userMLP: state[growthToolModule].userMLP,
});

const mapDispatchToProps = dispatch => ({
   refreshMLPData: () => dispatch(refreshMLPData()),
   getAutorides: botId => dispatch(getAllAutorides(botId)),
   getUserMLP: data => dispatch(getUserMLP(data)),
   createMLP: data => dispatch(createMLP(data)),
   updateMLP: data => dispatch(updateMLP(data)),
   getMLP: data => dispatch(getMLP(data))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(GrowthToolMlp);
