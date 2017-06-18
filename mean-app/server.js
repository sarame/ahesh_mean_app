var mongoose = require('mongoose');
var tagModel = require('./collections/tag');
var recipeModel = require ('./collections/recipe');
var reviewModel = require ('./collections/review');
var userModel = require ('./collections/user');
var badgeModel = require ('./collections/badge');
var courseModel = require ('./collections/course');
var ingredientModel = require ('./collections/ingredient');
var sectionModel = require ('./collections/section');
var unitType = require('./collections/unitType');
var projectRoutes = require('./routes');
var express = require('express');
var bodyParser = require('body-parser');

const path = require('path');
const http = require('http');
mongoose.Promise = global.Promise;//////////////////////////
mongoose.connect("mongodb://localhost:27017/Aesh_Mal7");

// Get dependencies

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use(projectRoutes);
app.use(express.static("public"));


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
