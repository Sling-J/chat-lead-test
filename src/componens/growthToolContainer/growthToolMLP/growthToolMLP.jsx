import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {getAllAutorides} from "../../../actions/actionCreator";

import {useTheme} from '@material-ui/core/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faFileAlt, faCode, faCheck} from "@fortawesome/free-solid-svg-icons";

import GrowthToolMlpSettings from "./growthToolMLPSettings";
import GrowthToolMlpContent from "./growthToolMLPContent";
import GrowthToolMlpCode from "./growthToolMLPCode";

import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";

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
            <div>

            </div>
         ) : null}
      </p>
   )
};

const GrowthToolMlp = ({setPage, autoRidesData, getAutorides, match, loadingOfAutoRides}) => {
   const theme = useTheme();

   const [value, setValue] = useState(0);

   // Mlp Settings
   const [settingTitle, setSettingTitle] = useState('');
   const [selectedAutoRide, setSelectedAutoRide] = useState(null);

   // Mlp Content
   const [youtubeField, setYoutubeField] = useState('');
   const [description1, setDescription1] = useState('');
   const [phone1, setPhone1] = useState('');
   const [description2, setDescription2] = useState('');
   const [phone2, setPhone2] = useState('');
   const [actionText, setActionText] = useState('');
   const [file, setFile] = useState(null);

   // Mlp Code
   const [scriptForHead, setScriptForHead] = useState('');
   const [scriptForBody, setScriptForBody] = useState('');

   useEffect(() => {
      if (autoRidesData && autoRidesData.length === 0) {
         getAutorides(match.params.botId);
      }
   }, []);

   let disabled = true;

   const handleChange = (value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };

   if (value === 0) {
      disabled = settingTitle.length === 0 || !selectedAutoRide;
   } else if (value === 1) {
      disabled = (youtubeField.length === 0 || !file)
         && (description1.length === 0 || description2.length === 0)
         && (phone1.length === 0 || phone2.length === 0)
         && actionText.length === 0;
   } else if (value === 2) {
      disabled = false
   } else if (value === 3) {

   }

   return (
      <div className="mlp-container">
         <div className="mlp-nav pv1-flex pv1-j-sb pv1-flex-align-center">
            <Button
               onClick={() => setPage(0)}
               className="mlp-nav__back"
               variant="contained"
            >
               Назад к лидгентулам
            </Button>
            <Button
               className="mlp-nav__next"
               variant="contained"
               disabled={disabled}
               onClick={() => setValue(value === 0 ? 1 : value === 1 ? 2 : value === 2 ? 3 : value === 3 ? 4 : 0)}
            >
               Дальше
            </Button>
         </div>

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
                      onClick={() => handleChange(3)}>
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
                  selectedAutoRide={selectedAutoRide}
                  setSelectedAutoRide={setSelectedAutoRide}
                  loadingOfAutoRides={loadingOfAutoRides}
               />

               <TabPanel
                  value={value}
                  index={1}
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
                  setFile={setFile}
                  file={file}
               />

               <TabPanel
                  value={value}
                  index={2}
                  scriptForHead={scriptForHead}
                  setScriptForHead={setScriptForHead}
                  scriptForBody={scriptForBody}
                  setScriptForBody={setScriptForBody}
               />

               <TabPanel
                  value={value}
                  index={3}
               />
            </SwipeableViews>
         </div>
      </div>
   );
};

const mapStateToProps = ({autoridesReducers}) => ({
   autoRidesData: autoridesReducers.autoridesData,
   loadingOfAutoRides: autoridesReducers.loadingOfAutoRides,
});

const mapDispatchToProps = dispatch => ({
   getAutorides: (botId) => dispatch(getAllAutorides(botId)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(GrowthToolMlp);
