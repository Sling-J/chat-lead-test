import React from 'react';

import {Provider} from "react-redux";
import {ConfigProvider} from 'antd';
import {ConnectedRouter} from 'connected-react-router';

import ru_RU from "antd/es/locale-provider/ru_RU";
import moment from "moment";

import history from "./config/history/history";
import store from './boot/config'
import Root from "./componens/Root";

import "moment/locale/ru";

moment.locale('ru');

const App = () => (
   <ConfigProvider locale={ru_RU}>
      <Provider store={store}>
         <ConnectedRouter history={history}>
            <Root/>
         </ConnectedRouter>
      </Provider>
   </ConfigProvider>
);

export default App;
