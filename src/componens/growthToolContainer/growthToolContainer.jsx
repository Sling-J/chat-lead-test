import React, {useState} from 'react';

import MuiButton from "@material-ui/core/Button";

import GrowthToolContainerTable from "./growthToolContainerTable";
import GrowthToolMlp from "./growthToolMLP/growthToolMLP";

import mlpImage from "../../images/growthTool/mlp.PNG";
import lpShareImage from "../../images/growthTool/lpshare.PNG";
import widgetImage from "../../images/growthTool/widget.PNG";

const GrowthToolContainer = () => {
   const [page, setPage] = useState(0);

   if (page === 1) {
      return (
         <GrowthToolMlp setPage={setPage}/>
      )
   }

   return (
      <div className="growth-tool-container">
         <h2 className="growth-tool__title">Инструменты для роста клиентской базы</h2>

         <div className="growth-tool-box pv1-flex pv1-j-sb">
            <div className="growth-tool-box__item">
               <p className="growth-tool-box-item__title">MLP</p>

               <div className="growth-tool-box-item__img">
                  <img src={mlpImage} alt=""/>
               </div>

               <MuiButton
                  onClick={() => setPage(1)}
                  className="growth-tool-box-item__btn"
                  variant="contained"
               >
                  Добавить
               </MuiButton>
            </div>

            <div className="growth-tool-box__item">
               <p className="growth-tool-box-item__title">LP поделиться</p>

               <div className="growth-tool-box-item__img">
                  <img src={lpShareImage} alt=""/>
               </div>

               <MuiButton className="growth-tool-box-item__btn" variant="contained">Добавить</MuiButton>
            </div>

            <div className="growth-tool-box__item">
               <p className="growth-tool-box-item__title">Виджет</p>

               <div className="growth-tool-box-item__img">
                  <img src={widgetImage} alt=""/>
               </div>

               <MuiButton className="growth-tool-box-item__btn" variant="contained">Добавить</MuiButton>
            </div>
         </div>

         <GrowthToolContainerTable/>
      </div>
   )
};

export default GrowthToolContainer;
