import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

var socket = io();

ReactDOM.render(
  <App socket={socket}/>,
  document.body.appendChild(document.createElement('div'))
);
