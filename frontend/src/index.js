import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer' // as we named the file as index.js in reducer directory, it will automatically imported here.
import 'materialize-css/dist/css/materialize.min.css'
import {thunk} from 'redux-thunk';

import axios from 'axios'
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);