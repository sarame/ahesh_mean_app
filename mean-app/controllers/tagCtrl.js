
var tag = require("../collections/tag");

function GetAll(req, res) {
    tag.find({}).populate({
        path: 'recipes',
        select: '-_id',
    }).then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function AddTag(req, res) {
    var newTag = new tag(req.body);
    newTag.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function GetById(req, res) {
    tag.findById(req.params.id).then(_result => res.json("data is : " + _result))
        .catch(_err => res.status(500).send())
}

function Delete(req, res) {
    tag.findByIdAndRemove(req.params.id).then(_result => res.json("data is deleted: " + _result))
        .catch(_err => res.status(500).send())
}

function Update(req, res) {
    console.log("params  " + req.params);
    tag.findByIdAndUpdate(req.params.id, req.body).then(_result => res.json("data is updated: " + _result))
        .catch(_err => res.status(500).send())
}

// function GetAllRandam(req, res) {
//     tag.aggregate(
//         [{ $sample: { size: 6 } }]
//     ).find({}).populate({
//         path: 'recipes',
//         select: '-_id',
//     }).then(_result => res.json(_result))
//         .catch(_err => res.status(500).send())
// }
function GetAllRandam(req, res) {
    tag.aggregate(
        [{ $sample: { size: 5 } }],
        function (err, results) {
            tag.populate(results, { "path": "recipes", select: '-_id' }, function (err, results) {
                if (err) throw err;
                return res.json(results);
            });
        }
    );
}
module.exports = {
    AddTag: AddTag,
    GetAll: GetAll,
    GetById: GetById,
    Delete: Delete,
    Update: Update,
    GetAllRandam: GetAllRandam
}