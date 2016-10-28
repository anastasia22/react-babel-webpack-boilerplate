import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

export default function (req, res, renderProps, db) {
  function renderApp(props, res) {

  }
  if (req.url === '/cabinet') {
    console.log('get cabinet');
    if (req.sessionSlack && req.sessionSlack.user) {
      console.log('user in session found');
      db.User.findOne({email: req.sessionSlack.user.email}, {
        email: 1, firstName: 1, lastName: 1, _id: 1}, (err, user) => {
        if (!user) {
          console.log('wrond user data');
          req.sessionSlack.reset();
          res.redirect('/login');
        } else {
          res.locals.user = user;
          const markup = renderToString(<RouterContext {...renderProps}/>);
          res.render('index', {
            content: markup,
            initialState: JSON.stringify({
              user: user
            })
          });
        }
      });
    }
    else {
      req.sessionSlack.reset();
      console.log('no session, redirected to login');
      res.redirect('/login');
    }
  } else if (req.url === '/logout') {
    console.log('get logout');
    req.sessionSlack.reset();
    res.redirect('/login');
  } else if (req.url === '/register') {
    console.log('get register');
    req.sessionSlack.reset();
    const markup = renderToString(<RouterContext {...renderProps}/>);
    res.render('index', {
      content: markup,
      initialState: JSON.stringify({})
    });
  } else if (req.url === '/login') {
    const markup = renderToString(<RouterContext {...renderProps}/>);
    res.render('index', {
      content: markup,
      initialState: JSON.stringify({})
    });
  }  else if (req.url === '/') {
    res.redirect('/cabinet');
  } else {
    renderApp(renderProps, res)
  }
}
