import Tooltip from "@material-ui/core/Tooltip";
import copy from "clipboard-copy";
import * as React from "react";

class CopyToClipboard extends React.Component {
   state = {showTooltip: false};

   onCopy = (content) => {
      copy(content).then(r => console.log(r));
      this.setState({showTooltip: true});
   };

   handleOnTooltipClose = () => {
      this.setState({showTooltip: false});
   };

   render() {
      const {showTooltip} = this.state;
      const {TooltipProps, children} = this.props;

      return (
         <Tooltip
            title={"Скопировано в буфер обмена!"}
            onClose={this.handleOnTooltipClose}
            leaveDelay={1300}
            open={showTooltip}
            {...TooltipProps || {}}
         >
            {children({copy: this.onCopy})}
         </Tooltip>
      );
   }
}

export default CopyToClipboard;
