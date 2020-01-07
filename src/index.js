import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "emoji-mart/css/emoji-mart.css";
import 'antd/dist/antd.css';
import './styles/app.scss';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.unregister();
