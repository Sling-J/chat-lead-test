import React, {useState} from 'react';

import {Icon, Tooltip} from 'antd';

const FilledStatusContainer = ({children, status, title}) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div className="filled-status-container">
         <Tooltip title={title} placement="right">
            <div
               className="filled-status-container__icon"
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
            >
               {!status && (
                  <Icon type="warning" />
               )}
            </div>
         </Tooltip>

         {children({isHovered})}
      </div>
   );
};

export default FilledStatusContainer;