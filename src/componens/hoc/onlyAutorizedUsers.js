import React from 'react';

export default function onlyAutorizedUsers(WrappedComponent) {
   return class extends React.Component {
      render() {
         if (!localStorage.getItem('token')) {
            this.props.history.push("/auth");
            return null;
         } else {
            return <WrappedComponent {...this.props}/>
         }

      }
   }
};