var router = require('express').Router();
var reviewCtrl = require('../controllers/reviewCtrl');
router.get("/",reviewCtrl.GetAll);
router.get("/:id",reviewCtrl.GetById);
router.post("/", reviewCtrl.Add);
router.delete("/:id",reviewCtrl.Delete);
router.put("/:id",reviewCtrl.Update);// write updated properties in jason object in body

module.exports = router;
