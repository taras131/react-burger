import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {setupStore} from './services/store';
import {Provider} from 'react-redux';
import {BrowserRouter, HashRouter} from "react-router-dom";

require('dotenv').config();

ReactDOM.render(
    <React.StrictMode>
        <HashRouter basename="/react-burger">
            <Provider store={setupStore()}>
                <App/>
            </Provider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
