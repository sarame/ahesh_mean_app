var recipe= require("../collections/recipe");

function GetAll(req,res){
    recipe.find({}).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}
function Add(req,res)
{
    
    var newRecipe= new recipe(req.body);
    newRecipe.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function GetById(req,res){
    recipe.findById(req.params.id).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

function Delete(req,res){
    recipe.findByIdAndRemove(req.params.id).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

function Update(req,res){
    console.log("params  "+req.params);
    recipe.findByIdAndUpdate(req.params.id,req.body).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

function GetAllMostRated(req,res){
    recipe.find(e=> e.avgRate > 6).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send());
}

module.exports={
    Add:Add,
    GetAll:GetAll,
    GetById:GetById,
    Delete:Delete,
    Update:Update,
    GetAllMostRated:GetAllMostRated
}