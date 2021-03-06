
var mongoose = require('mongoose');
var tagModel = require('./collections/tag');
var recipeModel = require('./collections/recipe');
var unitTypeModel = require('./collections/unitType');
var reviewModel = require('./collections/review');
var userModel = require('./collections/user');
var badgeModel = require('./collections/badge');
var courseModel = require('./collections/course');
var ingradientModel = require('./collections/ingradient');
var sectionModel = require('./collections/section');
var projectRoutes = require('./routes');
var express = require('express');
var bodyParser = require('body-parser');

const path = require('path');
const http = require('http');


mongoose.connect("mongodb://localhost:27017/Aesh_Mal7");



// // /* insert tags */
// var resp = new unitTypeModel({
//   _id: "591454f48899140c88985162",
//   name: "KG",
// });
// resp.save().then(result => console.log(JSON.stringify(result, undefined, 2))).catch(err => console.log(err));

// var resp1 = new unitTypeModel({
//   _id: "5916e8e5d4fdc62b1c363626",
//   name: "GM",
// });
// resp1.save().then(result => console.log(JSON.stringify(result, undefined, 2))).catch(err => console.log(err));
// var tag1 = new tagModel({
//   name: "Hot",
// });
// tag1.save().then(result => console.log(JSON.stringify(result, undefined, 2))).catch(err => console.log(err));
// var tag2 = new tagModel({
//   name: "Diet",
// });
// tag2.save().then(result => console.log(JSON.stringify(result, undefined, 2))).catch(err => console.log(err));

// var tag3 = new tagModel({
//   name: "Pizza",
// });
// tag3.save().then(result => console.log(JSON.stringify(result, undefined, 2))).catch(err => console.log(err));

// var tag4 = new tagModel({
//   name: "Vagitarian",
// });
// tag4.save().then(result => console.log(JSON.stringify(result, undefined, 2))).catch(err => console.log(err));


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
