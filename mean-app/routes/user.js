var router = require('express').Router();
var userCtrl = require('../controllers/userCtrl');
router.get("/",userCtrl.GetAll);
router.get("/:id",userCtrl.GetById);
router.get("/visit/:id",userCtrl.GetVisitedRecipeWithTagById);
router.get("/visitRec/:id",userCtrl.GetVisitedRecipeById);
router.get("/fevRecipes/:id", userCtrl.GetFevRecipes);
router.get("/myRecipes/:id", userCtrl.GetUserRecipes);
router.post("/", userCtrl.Add);
router.delete("/:id",userCtrl.Delete);
router.put("/:id",userCtrl.Update);// write updated properties in jason object in body
 router.get("/g/:email", userCtrl.GetByEmail);




module.exports = router;

