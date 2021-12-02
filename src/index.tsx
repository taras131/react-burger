import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {setupStore} from './services/store';
import {Provider} from 'react-redux';

require('dotenv').config();

ReactDOM.render(
    <React.StrictMode>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
