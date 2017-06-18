var router = require('express').Router();
var contactUsCtrl = require('../controllers/contactUsCtrl');

router.post("/", contactUsCtrl.Add);

module.exports = router;

