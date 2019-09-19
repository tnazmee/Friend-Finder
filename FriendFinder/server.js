var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Configure the Express application
var app = express();
var PORT = process.env.PORT;

// Expose the public directory to access CSS files
app.use(express.static(path.join(__dirname, './app/public')));

// Add middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());

// Add the application routes
require(path.join(__dirname, '../routing/apiRoutes.js'))(app);
require(path.join(__dirname, '../routing/htmlRoutes.js'))(app);

// Start listening on PORT
app.listen(PORT, function () {
    console.log('Friend Finder app is listening on PORT: ' + PORT);
});