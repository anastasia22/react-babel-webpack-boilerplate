var React = require('react'),
		ReactDOMServer = require('react-dom/server'),
		express = require('express'),
		router = express.Router();

var Register = require('../app/components/Register.jsx').default;

router.get('/', function(req, res){
	console.log('get register');
	var reactHtml = ReactDOMServer.renderToString(React.createFactory(Register)());
	res.render('index', {content: reactHtml});
});

module.exports = router;
