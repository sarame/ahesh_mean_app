var unitType= require("../collections/unitType");

function GetAll(req,res){
    unitType.find({}).then(_result=>res.json("data is : "+_result))
    .catch(_err=>res.status(500).send())
}
function AddUnitType(req,res){
    var newUnitType= new unitType(req.body);
    newUnitType.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function GetById(req,res){
    unitType.findById(req.params.id).then(_result=>res.json("data is : "+_result))
    .catch(_err=>res.status(500).send())
}

function Delete(req,res){
    unitType.findByIdAndRemove(req.params.id).then(_result=>res.json("data is deleted: "+_result))
    .catch(_err=>res.status(500).send())
}

function Update(req,res){
    console.log("params  "+req.params);
    unitType.findByIdAndUpdate(req.params.id,req.body).then(_result=>res.json("data is updated: "+_result))
    .catch(_err=>res.status(500).send())
}
module.exports={
    AddUnitType:AddUnitType,
    GetAll:GetAll,
    GetById:GetById,
    Delete:Delete,
    Update:Update
}