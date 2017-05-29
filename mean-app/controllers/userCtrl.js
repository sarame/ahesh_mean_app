var user = require("../collections/user");

function GetAll(req, res) {
    user.find({})
        .populate({
            path: 'recipes',
            select: 'name -_id'
        })
        .populate({
            path: 'fevRecipes',
            select: 'name -_id'
        })
        .populate({
            path: 'shoppingList',
            select: 'name -_id'
        })
        .populate({
            path: 'enrolledCourse.course',
            select: '-_id',
        })
        .populate({
            path: 'enrolledCourse.visitedSections',
            select: '-_id',
        })
        .populate('badges.badgeid')
        .then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function Add(req, res) {
    var newuser = new user(req.body);
    newuser.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function GetById(req, res) {
    user.findById(req.params.id)
    .populate({
            path: 'recipes',
            select: 'name -_id'
        })
        .populate({
            path: 'fevRecipes',
            select: 'name -_id'
        })
        .populate({
            path: 'shoppingList',
            select: 'name -_id'
        })
        .populate({
            path: 'enrolledCourse.course',
            select: '-_id',
        })
        .populate({
            path: 'enrolledCourse.visitedSections',
            select: '-_id',
        })
        .populate('badges.badgeid')
        .then(_result => res.json("data is : " + _result))
        .catch(_err => res.status(500).send())
}

function Delete(req, res) {
    user.findByIdAndRemove(req.params.id).then(_result => res.json("data is deleted: " + _result))
        .catch(_err => res.status(500).send())
}

function Update(req, res) {
    console.log("params  " + req.params);
    user.findByIdAndUpdate(req.params.id, req.body).then(_result => res.json("data is updated: " + _result))
        .catch(_err => res.status(500).send())
}
module.exports = {
    Add: Add,
    GetAll: GetAll,
    GetById: GetById,
    Delete: Delete,
    Update: Update
}


// {
// 	"name":"soso sara",
// 	"img":" ",
// 	"authonticationId":" ",
// 	"email":"sara@gmail",
// 	"password":"sarsora",
// 	"bio":"i am a hero",
// 	"recipesNo":0,
// 	"badges": [{
// 		"badgeid":"591766378935f41688d6b6b7",
// 		"date":"",
// 		"time":""
// 	}],
// 	"enrolledCourse": [{
// 		"course":"591766378935f41688d6b6b8", 
// 		"visitedSections":["591766378935f41688d6b6b6"]
// 	}],
// 	"shoppingList": ["591766378935f41688d6b6b9"],
// 	"fevRecipes": ["591768c10d323923983df6ca"],
// 	"recipes": ["591768c10d323923983df6ca"]
	
// }