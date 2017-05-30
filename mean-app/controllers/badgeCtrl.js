var badgeModel = require("./../collections/badge");

function GetAll(req, res) {
    return badgeModel.find({})
        .then(result => res.json(result));
}

function GetById(req, res) {
    return badgeModel.findById(req.params['id'])
        .then(result => res.json(result));
}

function AddBadge(req, res) {
    var badge = new badgeModel(req.body);
    badge.save().then(result => res.json(result));
}

function DelBadge(req, res) {
    return badgeModel.findByIdAndRemove(req.params["id"])
        .then(result => res.json(result));
}

function UpBadge(req, res) {
    return badgeModel.findByIdAndUpdate(req.params["id"], req.body)
        .then(result => res.json(result));
}

module.exports = {
    GetAll: GetAll,
    GetById: GetById,
    AddBadge: AddBadge,
    DelBadge: DelBadge,
    UpBadge: UpBadge
}