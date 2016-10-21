// module.exports = function (callback) {
// 	var React = require('react'),
// 			ReactDOMServer = require('react-dom/server'),
// 			express = require('express'),
// 			router = express.Router();
//
// 	var Cabinet = require('./app/components/Cabinet.jsx').default;
// 	var Header = require('./app/components/Header.jsx').default;
// 	var SideMenu = require('./app/components/SideMenu.jsx').default;
//
// 	var layoutObject = {
// 		header: ReactDOMServer.renderToString(React.createFactory(Login)()),
// 		sidemenu: ReactDOMServer.renderToString(React.createFactory(SideMenu)());
// 	}
//
// 	router.get('/cabinet', function(req, res){
// 		console.log('get cabinet');
// 		var reactHtml = ReactDOMServer.renderToString(React.createFactory(Cabinet)());
// 		res.render('index', Object.assign({
// 			content: reactHtml
// 		}, layoutObject));
// 	});
// 	callback()
// };
