import React from 'react';

import ConditionsForElements from "./conditionsForElements";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const ConditionsContainer = ({conditions, hideCondition}) => (
   <div style={{width: '100%'}}>
      <ReactCSSTransitionGroup
         transitionName="conditions-tr"
         transitionEnterTimeout={500}
         transitionLeaveTimeout={300}
      >
         {conditions && (
            !hideCondition && <ConditionsForElements/>
         )}
      </ReactCSSTransitionGroup>
   </div>
);

export default ConditionsContainer;
