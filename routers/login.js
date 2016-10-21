var React = require('react'),
		ReactDOMServer = require('react-dom/server'),
		express = require('express'),
		router = express.Router();

var Login = require('../app/components/Login.jsx').default;

router.get('/', function(req, res){
	console.log('get login');
	var reactHtml = ReactDOMServer.renderToString(React.createFactory(Login)());
	res.render('index', {content: reactHtml});
});

module.exports = router;
