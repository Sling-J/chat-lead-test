import React, {Component} from "react";

export default class ClickedOutside extends Component {
   componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
   }

   componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
   }

   handleClickOutside = event => {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
         this.props.onClickedOutside();
      }
   };

   render() {
      let firstNotFunctionalComponent = this.props.children;

      while (typeof firstNotFunctionalComponent.type === "function") {
         firstNotFunctionalComponent = firstNotFunctionalComponent.props.children;
      }

      const children = React.cloneElement(firstNotFunctionalComponent, {
         ref: node => {
            this.wrapperRef = node;
         },
         ...firstNotFunctionalComponent.props
      });

      return <React.Fragment>{children}</React.Fragment>;
   }
}