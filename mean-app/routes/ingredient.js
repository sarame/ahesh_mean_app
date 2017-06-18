var router = require("express").Router();
var ingredientCtrl = require("../controllers/ingredientCtrl");

router.get("/", ingredientCtrl.GetAll);

router.get("/:id", ingredientCtrl.GetById);

router.post("/", ingredientCtrl.Add);

router.delete("/:id", ingredientCtrl.Delete);

module.exports = router;