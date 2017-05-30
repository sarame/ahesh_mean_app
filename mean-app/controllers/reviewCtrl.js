var review= require("../collections/review");

function GetAll(req,res){
    review.find({}).then(_result=>res.json("data is : "+_result))
    .catch(_err=>res.status(500).send())
}
function Add(req,res){
    var newReview= new review(req.body);
    newReview.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function GetById(req,res){
    review.findById(req.params.id).then(_result=>res.json("data is : "+_result))
    .catch(_err=>res.status(500).send())
}

function Delete(req,res){
    review.findByIdAndRemove(req.params.id).then(_result=>res.json("data is deleted: "+_result))
    .catch(_err=>res.status(500).send())
}

function Update(req,res){
    console.log("params  "+req.params);
    review.findByIdAndUpdate(req.params.id,req.body).then(_result=>res.json("data is updated: "+_result))
    .catch(_err=>res.status(500).send())
}
module.exports={
    Add:Add,
    GetAll:GetAll,
    GetById:GetById,
    Delete:Delete,
    Update:Update
}