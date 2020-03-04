import React, {useState} from 'react';
import {connect} from "react-redux";

import {Input, Icon} from 'antd';
import Button from "@material-ui/core/Button";

import GrowthToolMLPDemo from "./growthToolMLPDemo";
import CopyToClipboard from "../../Containers/CopyToClipboard";
import PageLoader from "../../Containers/PageLoader";

import {moduleName as growthToolModule} from "../../../ducks/GrowthTool";

const GrowthToolMlpResult = props => (
   <PageLoader loading={props.loadingOfUpdating}>
      <div className="mlp-result">
         <div className="mlp-result-container">
            <div className="mlp-result-content">
               <div className="mlp-result-content__item">
                  <p className="mlp-result-content-item__title">Домен</p>
                  <p className="mlp-result-content-item__domain">http://chatl.cc/mlp/{props.createdMLP.id || props.updatedMLP.id || props.mlpId}</p>
               </div>

               <div className="mlp-result-content__item">
                  <CopyToClipboard>
                     {({copy}) => (
                        <Button
                           variant="outlined"
                           className="mlp-result-content-item__button"
                           onClick={() => copy(`http://chatl.cc/mlp/${props.createdMLP.id || props.updatedMLP.id || props.mlpId}`)}
                        >
                           <Icon type="copy"/>
                           Скопировать ссылку
                        </Button>
                     )}
                  </CopyToClipboard>
               </div>
            </div>
         </div>

         <GrowthToolMLPDemo {...props}/>
      </div>
   </PageLoader>
);

export default connect(state => ({
   createdMLP: state[growthToolModule].createdMLP,
   updatedMLP: state[growthToolModule].updatedMLP,
}))(GrowthToolMlpResult);