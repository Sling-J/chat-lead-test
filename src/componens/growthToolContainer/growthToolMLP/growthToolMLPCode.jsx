import React from 'react';

const GrowthToolMlpCode = ({scriptForHead, setScriptForHead, scriptForBody, setScriptForBody}) => (
   <div className="mlp-code">
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
);

export default GrowthToolMlpCode;