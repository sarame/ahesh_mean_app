var router = require('express').Router();
var tagRoutes = require('./tag');
var unitTypeRoutes = require('./unitType');
var recipeRoutes=  require('./recipe');
var reviewRoutes = require('./review') ;
var userRoutes = require('./user') ;


router.use("/api/tags", tagRoutes);
router.use("/api/unitTypes", unitTypeRoutes);
router.use("/api/recipe", recipeRoutes) ;
router.use("/api/review", reviewRoutes) ;
router.use("/api/user", userRoutes) ;

module.exports = router;