var router = require("express").Router();
var courseCtrl = require("../controllers/courseCtrl");

router.get("/", courseCtrl.GetAll);

router.get("/Three/", courseCtrl.GetAllThree);

router.get("/:id", courseCtrl.GetById);

router.post("/", courseCtrl.AddCourse);

router.delete("/:id", courseCtrl.Delete);

router.put("/:id", courseCtrl.Update);

module.exports = router;