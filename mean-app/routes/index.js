// <<<<<<< HEAD
// var router = require('express').Router();
// var tagRoutes = require('./tag');
// var unitTypeRoutes = require('./unitType');
// var recipeRoutes=  require('./recipe');
// var reviewRoutes = require('./review') ;
// var userRoutes = require('./user') ;


// router.use("/api/tags", tagRoutes);
// router.use("/api/unitTypes", unitTypeRoutes);
// router.use("/api/recipe", recipeRoutes) ;
// router.use("/api/review", reviewRoutes) ;
// router.use("/api/user", userRoutes) ;

// =======
var router = require('express').Router();
var tagRoutes = require('./tag');
var unitTypeRoutes = require('./unitType');
var recipeRoutes = require('./recipe');
var reviewRoutes = require('./review');
var userRoutes = require('./user');
var badgeRoutes = require('./badge');
var ingredientRoutes = require("./ingredient");
var courseRoutes = require('./course');
var sectionRoutes = require('./section') ;
var contactUsRoutes = require('./contactUs');

//router.use("/api/tags", tagRoutes);
router.use("/api/tag", tagRoutes);
//router.use("/api/unitTypes", unitTypeRoutes);
router.use("/api/unittypes", unitTypeRoutes);
//router.use("/api/tags", tagRoutes);
router.use("/api/unitTypes", unitTypeRoutes);
router.use("/api/recipe", recipeRoutes);
router.use("/api/courses",courseRoutes);
router.use("/api/review", reviewRoutes);
router.use("/api/user", userRoutes);
router.use("api/badge", badgeRoutes);
router.use("/api/ingredient", ingredientRoutes);
router.use("/api/course", courseRoutes);
router.use("/api/section", sectionRoutes) ;
router.use("/api/contactus" , contactUsRoutes);
module.exports = router;