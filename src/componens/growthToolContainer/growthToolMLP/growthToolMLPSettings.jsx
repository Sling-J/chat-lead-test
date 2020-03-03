import React from "react";
import {Input, Select} from "antd";

import PageLoader from "../../Containers/PageLoader";

const {Option} = Select;

const GrowthToolMlpSettings = ({settingTitle, loadingOfUserMLP, setSettingTitle, loadingOfAutoRides, setSelectedAutoRide, autoRidesData, selectedAutoRide}) => {
   function onChange(value) {
      setSelectedAutoRide(value);
   }

   return (
      <PageLoader loading={loadingOfUserMLP}>
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
                  value={selectedAutoRide}
                  onChange={onChange}
                  filterOption={(input, option) =>
                     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
               >
                  {autoRidesData.length !== 0 && autoRidesData.map(item => (
                     <Option value={item.id}>{item.scenario.trigger_text}</Option>
                  ))}
               </Select>
            </div>
         </div>
      </PageLoader>
   )
};

export default GrowthToolMlpSettings;
