var router = require('express').Router();
var unitTypeCtrl = require('../controllers/unitTypeCtrl');
router.get("/",unitTypeCtrl.GetAll);
router.get("/:id",unitTypeCtrl.GetById);
router.post("/", unitTypeCtrl.AddUnitType);
router.delete("/:id",unitTypeCtrl.Delete);
router.put("/:id",unitTypeCtrl.Update);// write updated properties in jason object in body

module.exports = router;




















