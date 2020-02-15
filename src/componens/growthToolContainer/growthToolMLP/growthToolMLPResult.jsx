import React, {useState} from 'react';

import {Input, Icon} from 'antd';
import Button from "@material-ui/core/Button";

import GrowthToolMLPDemo from "./growthToolMLPDemo";
import CopyToClipboard from "../../Containers/CopyToClipboard";

const GrowthToolMlpResult = props => {
   const [domain, setDomain] = useState('7989007');

   return (
      <div className="mlp-result">
         <div className="mlp-result-container">
            <div className="mlp-result-content">
               <div className="mlp-result-content__item">
                  <p className="mlp-result-content-item__title">Домен</p>
                  <Input
                     value={domain}
                     className="mlp-result-content-item__field"
                     addonBefore="wep.logo.ai/"
                     onChange={e => setDomain(e.target.value)}
                  />
               </div>

               <div className="mlp-result-content__item">
                  <CopyToClipboard>
                     {({copy}) => (
                        <Button
                           variant="outlined"
                           className="mlp-result-content-item__button"
                           onClick={() => copy(`wep.logo.ai/${domain}`)}
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
   );
};

export default GrowthToolMlpResult;