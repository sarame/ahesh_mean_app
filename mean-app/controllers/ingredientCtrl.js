var ingredient = require("../collections/ingredient");

function GetAll(req,res){
   // console.log("result:  " + res.json)
    ingredient.find({}).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}
function Add(req,res){
    var newingredient= new ingredient(req.body);
    newingredient.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function GetById(req,res){
    ingredient.findById(req.params.id).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

function Delete(req,res){
    ingredient.findByIdAndRemove(req.params.id).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

module.exports={
    Add:Add,
    GetAll:GetAll,
    GetById:GetById,
    Delete:Delete
}