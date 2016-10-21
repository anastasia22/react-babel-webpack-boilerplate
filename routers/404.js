var React = require('react'),
		ReactDOMServer = require('react-dom/server'),
		express = require('express'),
		router = express.Router();

var NotFound = require('../app/components/static/NotFound.jsx').default;

module.exports = function(req, res) {
		var reactHtml = ReactDOMServer.renderToString(React.createFactory(NotFound)());
		res.render('index', {content: reactHtml});
};
