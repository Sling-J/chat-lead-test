import React, {Component} from 'react';
import {Provider} from 'react-redux';

import {LocaleProvider} from "antd";
import ru_RU from 'antd/es/locale-provider/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';

import config from './config';
import App from '../App';

moment.locale('ru');

class Store extends Component {
   constructor(props) {
      super(props);

      this.state = {
         store: config(),
      };
   }

   render() {
      return (
         <LocaleProvider locale={ru_RU}>
            <Provider store={this.state.store}>
               <App/>
            </Provider>
         </LocaleProvider>
      );
   }
}

export default Store;
