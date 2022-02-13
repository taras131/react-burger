import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {setupStore} from './services/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

require('dotenv').config();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename="/react-burger/">
            <Provider store={setupStore()}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
