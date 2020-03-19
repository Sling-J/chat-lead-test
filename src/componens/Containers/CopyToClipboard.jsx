import React, {useState} from "react";

import Tooltip from "@material-ui/core/Tooltip";
import copy from "clipboard-copy";

const CopyToClipboard = ({children, TooltipProps}) => {
   const [tooltipVisibility, setTooltipVisibility] = useState(false);

   const onCopy = content => {
      copy(content).then(r => console.log(r));
      setTooltipVisibility(true);
   };

   const handleOnTooltipClose = () => {
      setTooltipVisibility(false);
   };

   return (
      <Tooltip
         title="Скопировано в буфер обмена!"
         onClose={handleOnTooltipClose}
         leaveDelay={1300}
         open={tooltipVisibility}
         placement="top"
         {...TooltipProps || {}}
      >
         {children({copy: onCopy})}
      </Tooltip>
   );
};

export default CopyToClipboard;