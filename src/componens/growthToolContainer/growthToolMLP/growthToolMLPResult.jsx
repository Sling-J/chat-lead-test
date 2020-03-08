import React, {useState} from 'react';
import {connect} from "react-redux";

import {Icon} from 'antd';
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
                  <p className="mlp-result-content-item__domain">http://chatlead.me/{props.createdMLP.id || props.updatedMLP.id || props.mlpId}</p>
               </div>

               <div className="mlp-result-content__item pv1-flex pv1-j-sb pv1-flex-align-center">
                  <a
                     className="mlp-result-content-item__button-container"
                     href={`http://chatlead.me/${props.createdMLP.id || props.updatedMLP.id || props.mlpId}`}
                     target="_blank"
                  >
                     <Button variant="contained" className="mlp-result-content-item__button-link">
                        Открыть в новой вкладке
                     </Button>
                  </a>

                  <CopyToClipboard>
                     {({copy}) => (
                        <Button
                           variant="outlined"
                           className="mlp-result-content-item__button"
                           onClick={() => copy(`http://chatlead.me/${props.createdMLP.id || props.updatedMLP.id || props.mlpId}`)}
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