var contactUs = require("../collections/contactUs");

function Add(req, res) {
    var newcontactUs = new contactUs(req.body);
    newcontactUs.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}

module.exports = {
    Add: Add
}