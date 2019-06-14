import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./home"
import Add from "./adduser/oldindex"
import {BrowserRouter, Route, Switch, Router, Link} from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory()

ReactDOM.render(  
    <Provider store={store}>
      <Router  history={history}>
        <App />
      </Router>
  </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

