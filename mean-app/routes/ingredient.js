var router = require("express").Router();
var ingredientCtrl = require("./../controllers/ingredientCtrl");

router.get("/", ingredientCtrl.GetAll);

router.get("/:id", ingredientCtrl.GetById);

router.post("/", ingredientCtrl.AddIngredient);

router.delete("/:id", ingredientCtrl.DelIngredient);

router.put("/:id", ingredientCtrl.UpIngredient);

module.exports = router;