import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Button from "@material-ui/core/Button";

import GrowthToolContainerTable from "./growthToolContainerTable";
import GrowthToolMlp from "./growthToolMLP/growthToolMLP";

import mlpImage from "../../images/growthTool/mlp.PNG";
import lpShareImage from "../../images/growthTool/lpshare.PNG";
import widgetImage from "../../images/growthTool/widget.PNG";

import {soonModal} from "../../utils/deletionConfirmation";

import {getMLP} from "../../ducks/GrowthTool";

const GrowthToolContainer = ({getMLP, match}) => {
   const [page, setPage] = useState(0);
   const [mlpId, setMLPId] = useState(null);

   const botId = match.params.botId;

   useEffect(() => {
      getMLP(botId);
   }, []);

   if (page === 1) {
      return (
         <GrowthToolMlp mlpId={mlpId} setPage={setPage}/>
      )
   } else {
      return (
         <div className="growth-tool-container">
            <h2 className="growth-tool__title">Инструменты для роста клиентской базы</h2>

            <div className="growth-tool-box pv1-flex pv1-j-sb">
               <div className="growth-tool-box__item">
                  <p className="growth-tool-box-item__title">MLP</p>

                  <div className="growth-tool-box-item__img">
                     <img src={mlpImage} alt=""/>
                  </div>

                  <Button
                     onClick={() => {
                        setPage(1);
                        setMLPId(null);
                     }}
                     className="growth-tool-box-item__btn"
                     variant="contained"
                  >
                     Добавить
                  </Button>
               </div>

               <div className="growth-tool-box__item">
                  <p className="growth-tool-box-item__title">LP поделиться</p>

                  <div className="growth-tool-box-item__img">
                     <img src={lpShareImage} alt=""/>
                  </div>

                  <Button
                     onClick={soonModal}
                     className="growth-tool-box-item__btn"
                     variant="contained"
                  >
                     Добавить
                  </Button>
               </div>

               <div className="growth-tool-box__item">
                  <p className="growth-tool-box-item__title">Виджет</p>

                  <div className="growth-tool-box-item__img">
                     <img src={widgetImage} alt=""/>
                  </div>

                  <Button
                     onClick={soonModal}
                     className="growth-tool-box-item__btn"
                     variant="contained"
                  >
                     Добавить
                  </Button>
               </div>
            </div>

            <GrowthToolContainerTable
               setMLPId={setMLPId}
               setPage={setPage}
            />
         </div>
      )
   }
};

export default compose(
   withRouter,
   connect(null, {
      getMLP
   })
)(GrowthToolContainer);
