import React from 'react';

import ConditionsForElements from "./conditionsForElements";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const ConditionsContainer = props => (
   <div style={{width: '100%'}}>
      <ReactCSSTransitionGroup
         transitionName="conditions-tr"
         transitionEnterTimeout={500}
         transitionLeaveTimeout={300}
      >
         {props.conditions && (
            !props.hideCondition && <ConditionsForElements {...props}/>
         )}
      </ReactCSSTransitionGroup>
   </div>
);

export default ConditionsContainer;
