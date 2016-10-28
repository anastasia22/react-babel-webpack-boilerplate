import React from 'react';
import { match, Router } from 'react-router'
import { render } from 'react-dom'
import { createBrowserHistory  } from 'history'
import { browserHistory } from 'react-router'
import routes from '../router'
import './main.scss'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

Object.assign(routes, {initData: window.__APP_INITIAL_STATE__});

match({ routes, location }, () => {
 render(
   <Router
     routes={routes}
     history={browserHistory}
   />,
   document.getElementById('content'))
})
