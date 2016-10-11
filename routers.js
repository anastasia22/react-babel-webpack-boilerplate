var React = require('react'),
		ReactDOMServer = require('react-dom/server'),
		express = require('express'),
		router = express.Router();

var Login = require('./app/components/Login.jsx').default;
var Register = require('./app/components/Register.jsx').default;

router.get('/login', function(req, res){
	var reactHtml = ReactDOMServer.renderToString(React.createFactory(Login)());
  res.render('index', {content: reactHtml});
});

router.get('/register', function(req, res){
	var reactHtml = ReactDOMServer.renderToString(React.createFactory(Register)());
  res.render('index', {content: reactHtml});
});

module.exports = router;
