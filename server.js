// Imports
var express = require('express');
var path = require('path');

var routes = require('./routes/index.js');
var users = require('./routes/users.js');

// Configure app
var app = express();
app.set('port', 8080);
app.use(express.static(path.join(__dirname, 'assets')));

// Set routes
app.use('/', routes);
app.use('/users', users);

// Start server
app.listen(app.get('port'));

