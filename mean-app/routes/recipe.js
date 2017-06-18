var router = require('express').Router();
var recipeCtrl = require('../controllers/recipeCtrl');
router.get("/",recipeCtrl.GetAll);
router.get("/:id",recipeCtrl.GetById);
router.post("/", recipeCtrl.Add);
router.delete("/:id",recipeCtrl.Delete);
router.put("/:id",recipeCtrl.Update);// write updated properties in jason object in body

module.exports = router;

