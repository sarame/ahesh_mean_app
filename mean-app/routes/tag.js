var router = require('express').Router();
var tagCtrl = require('../controllers/tagCtrl');
router.get("/",tagCtrl.GetAll);
router.get("/:id",tagCtrl.GetById);
router.post("/", tagCtrl.AddTag);
router.delete("/:id",tagCtrl.Delete);
router.put("/:id",tagCtrl.Update);// write updated properties in jason object in body

module.exports = router;




















