var http = require('http'),
		serveStatic = require('serve-static'),
		finalhandler = require('finalhandler');

var serve = serveStatic('./');

http.createServer((request, response) => {
	serve(request, response, finalhandler(request, response));
}).listen(8080);

