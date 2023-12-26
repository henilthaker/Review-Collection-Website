import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer' // as we named the file as index.js in reducer directory, it will automatically imported here.
import 'materialize-css/dist/css/materialize.min.css'
import {thunk} from 'redux-thunk';

const store = createStore(reducers, {}, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
console.log(process.env.REACT_APP_STRIPE_KEY);
console.log(process.env.NODE_ENV);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals