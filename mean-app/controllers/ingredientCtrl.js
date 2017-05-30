var ingredientModel = require("./../collections/ingradient");

function GetAll(req, res) {
    return ingredientModel.find({})
        .then(result => res.json(result));
}

function GetById(req, res) {
    return ingredientModel.findById(req.params['id'])
        .then(result => res.json(result));
}

function AddIngredient(req, res) {
    var ingredient = new ingredientModel(req.body);
    ingredient.save().then(result => res.json(result));
}

function DelIngredient(req, res) {
    return ingredientModel.findByIdAndRemove(req.params["id"])
        .then(result => res.json(result));
}

function UpIngredient(req, res) {
    return ingredientModel.findByIdAndUpdate(req.params["id"], req.body)
        .then(result => res.json(result));
}

module.exports = {
    GetAll: GetAll,
    GetById: GetById,
    AddIngredient: AddIngredient,
    DelIngredient: DelIngredient,
    UpIngredient: UpIngredient
}