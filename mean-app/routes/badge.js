var router = require("express").Router();
var badgeCtrl = require("./../controllers/badgeCtrl");

router.get("/", badgeCtrl.GetAll);

router.get("/:id", badgeCtrl.GetById);

router.post("/", badgeCtrl.AddBadge);

router.delete("/:id", badgeCtrl.DelBadge);

router.put("/:id", badgeCtrl.UpBadge);

module.exports = router;