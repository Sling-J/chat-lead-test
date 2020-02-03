import React from 'react';

import GrowthToolMLPDemo from "./growthToolMLPDemo";

const GrowthToolMlpCode = props => {
   const {
      scriptForHead, setScriptForHead,
      scriptForBody, setScriptForBody
   } = props;

   return (
      <div className="mlp-code">
         <div className="mlp-code-container">
            <div className="mlp-code__item">
               <p className="mlp-code-item__title">Script for HEAD tag:</p>

               <textarea
                  className="mlp-code-item__field"
                  value={scriptForHead}
                  placeholder="Вставьте скрипт"
                  onChange={e => setScriptForHead(e.target.value)}
               />

               <p className="mlp-code-item__desc">Не обязательно для заполнения!</p>
            </div>

            <div className="mlp-code__item">
               <p className="mlp-code-item__title">Script for HEAD tag:</p>

               <textarea
                  className="mlp-code-item__field"
                  value={scriptForBody}
                  placeholder="Вставьте скрипт"
                  onChange={e => setScriptForBody(e.target.value)}
               />

               <p className="mlp-code-item__desc">Не обязательно для заполнения!</p>
            </div>
         </div>

         <GrowthToolMLPDemo {...props}/>
      </div>
   );
};

export default GrowthToolMlpCode;