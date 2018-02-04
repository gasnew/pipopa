var http = require('http');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');

var serve = serveStatic('./');

http.createServer((request, response) => {
  serve(request, response, finalhandler(request, response));
}).listen(8080);

