var router = require('express').Router();
var userCtrl = require('../controllers/userCtrl');
router.get("/",userCtrl.GetAll);
router.get("/:id",userCtrl.GetById);
router.post("/", userCtrl.Add);
router.delete("/:id",userCtrl.Delete);
router.put("/:id",userCtrl.Update);// write updated properties in jason object in body

module.exports = router;

