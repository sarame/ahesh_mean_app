var section= require("../collections/section");

function GetAll(req,res){
    section.find({}).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}
function Add(req,res){
    var newReview= new section(req.body);
    newReview.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function GetById(req,res){
    section.findById(req.params.id).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

function Delete(req,res){
    section.findByIdAndRemove(req.params.id).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

function Update(req,res){
    console.log("params  "+req.params);
    section.findByIdAndUpdate(req.params.id,req.body).then(_result=>res.json("data is updated: "+_result))
    .catch(_err=>res.status(500).send())
}
module.exports={
    Add:Add,
    GetAll:GetAll,
    GetById:GetById,
    Delete:Delete,
    Update:Update
}