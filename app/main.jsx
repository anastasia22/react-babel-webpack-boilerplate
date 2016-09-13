import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import Input from './components/Input.jsx';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'login', component: Input },
    { path: 'register', component: RegisterForm },
  ]
}


ReactDOM.render(
  <Router history={hashHistory} routes={routes} />,
  document.body.appendChild(document.createElement('div'))
);


// var socket = io();

// ReactDOM.render(
//   <App socket={socket}/>,
//   document.body.appendChild(document.createElement('div'))
// );
