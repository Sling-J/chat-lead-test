import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {getAllAutorides} from "../../../actions/actionCreator";

import {useTheme} from '@material-ui/core/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faFileAlt, faCode, faCheck} from "@fortawesome/free-solid-svg-icons";

import {Input, Select} from "antd";

import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";

const {Option} = Select;

const TabPanel = ({value, index, settingTitle, setSettingTitle, autoRidesData, setSelectedAutoRide, loadingOfAutoRides}) => {
   function onChange(value) {
      setSelectedAutoRide(value);
   }

   return value === index && (
      <p className="mlp-carousel">
         {index === 0 ? (
            <div className="mlp-setting">
               <div className="mlp-setting__item">
                  <p className="mlp-setting-item__title">Название</p>

                  <Input
                     placeholder="Название 1"
                     style={{width: 300}}
                     value={settingTitle}
                     onChange={e => setSettingTitle(e.target.value)}
                  />
               </div>

               <div className="mlp-setting__item">
                  <p className="mlp-setting-item__title">Название</p>

                  <Select
                     showSearch
                     style={{width: 300}}
                     placeholder="Выберите автоворнку"
                     optionFilterProp="children"
                     loading={loadingOfAutoRides}
                     onChange={onChange}
                     filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                     }
                  >
                     {autoRidesData.length !== 0 && autoRidesData.map(item => (
                        <Option value={item.id}>{item.trigger_text}</Option>
                     ))}
                  </Select>
               </div>
            </div>
         ) : index === 1 ? (
            <div>

            </div>
         ) : index === 2 ? (
            <div>

            </div>
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
   const [settingTitle, setSettingTitle] = useState('');
   const [selectedAutoRide, setSelectedAutoRide] = useState(null);

   useEffect(() => {
      if (autoRidesData && autoRidesData.length === 0) {
         getAutorides(match.params.botId);
      }
   }, []);

   const handleChange = (value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };

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
                  setSelectedAutoRide={setSelectedAutoRide}
                  loadingOfAutoRides={loadingOfAutoRides}
               />

               <TabPanel
                  value={value}
                  index={1}
               />

               <TabPanel
                  value={value}
                  index={2}
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
