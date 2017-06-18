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
            path: 'visitedRecipes',
            select: 'name tags -_id',
            populate: {
                path: 'tags',
                select: 'name'
            }
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

function GetVisitedRecipeWithTagById(req, res) {
    user.findById(req.params.id)
        .populate({
            path: 'visitedRecipes',
            select: 'tags -_id',
            populate: {
                path: 'tags',
                select: 'name'
            }
        })
        .then(_result => res.json(_result.visitedRecipes))
        .catch(_err => res.status(500).send())
}


function GetVisitedRecipeById(req, res) {
    user.findById(req.params.id)
        .then(_result => res.json(_result.visitedRecipes))
        .catch(_err => res.status(500).send())
}


function GetById(req, res) {
    user.findById(req.params.id)
        .populate({
            path: 'recipes',
            select: 'name avgRate img _id'
        })
        .populate({
            path: 'fevRecipes'
        })
        .populate({
            path: 'shoppingList.ingredient shoppingList.unitType',
            select: 'name _id'
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
        .populate({ path: 'currentBadge' }).populate({ path: 'nextBadge' })
        .then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}

function Delete(req, res) {
    user.findByIdAndRemove(req.params.id).then(_result => res.json("data is deleted: " + _result))
        .catch(_err => res.status(500).send())
}

function Update(req, res) {
    console.log("params  " + req.params);
    console.log(req.body);
    user.findByIdAndUpdate(req.params.id, req.body).then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
//check the user is exist of not 
function GetByEmail(req, res) {
    //   console.log("da el body: " +req.params.email )
    var email = req.params['email'];
    console.log(email);
    user.findOne({
        $or: [
            { 'email': email }
        ]
    })
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


function GetFevRecipes(req, res) {
    user.findById(req.params.id)
        .populate({
            path: 'fevRecipes',
            select: 'name avgRate img _id user tags totalCalories',
            populate: {
                path: 'user tags',
                select: 'name img _id',
            }
        }).select('fevRecipes -_id')
        .then(_result => res.json(_result.fevRecipes))
        .catch(_err => res.status(500).send());
}

function GetUserRecipes(req, res) {
    user.findById(req.params.id)
        .populate({
            path: 'recipes',
            select: 'name avgRate img _id user tags totalCalories',
            populate: {
                path: 'user tags',
                select: 'name img _id',
            }
        }).select('recipes -_id')
        .then(_result => res.json(_result.recipes))
        .catch(_err => res.status(500).send());
}

module.exports = {
    Add: Add,
    GetAll: GetAll,
    GetById: GetById,
    Delete: Delete,
    Update: Update,
    GetByEmail: GetByEmail,
    GetFevRecipes: GetFevRecipes,
    GetUserRecipes: GetUserRecipes,
    GetVisitedRecipeById: GetVisitedRecipeById,
    GetVisitedRecipeWithTagById: GetVisitedRecipeWithTagById
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