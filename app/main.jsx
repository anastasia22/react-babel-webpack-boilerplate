import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from './components/RegisterForm.jsx';
import Input from './components/Input.jsx';
import { createHashHistory } from 'history';
import { Router, Route, IndexRoute, Link, useRouterHistory  } from 'react-router';
import $ from 'jquery';
import App from './components/App.jsx';



const appHistory = useRouterHistory(createHashHistory)({
   queryKey: false
 });

ReactDOM.render(
  <Router history={appHistory}>
    <Route path="/" component={App}>
      <Route path="/register" component={RegisterForm}/>
      <Route path="/login" component={Input}/>
    </Route>
  </Router>,
  document.body.appendChild(document.createElement('div'))
);

/*
// var socket = io();

// ReactDOM.render(
//   <App socket={socket}/>,
//   document.body.appendChild(document.createElement('div'))
// );*/
