var course= require("../collections/course");

function GetAll(req,res){
    course.find({}).limit(3).populate({
        path:"sections",
        select:'title text'
    }).then(_result=> {res.json(_result)})
    .catch(_err=>res.status(500).send())
}
function GetAllThree(req,res){
    course.find({}).populate({
        path:"sections",
        select:'title text'
    }).then(_result=> {res.json(_result)})
    .catch(_err=>res.status(500).send())
}


function AddCourse(req,res){
    var newCourse= new course(req.body);
    newCourse.save().then(_result => res.json(_result))
        .catch(_err => res.status(500).send())
}
function GetById(req,res){
    course.findById(req.params.id).populate({
        path:"sections",
     select: 'title text mltimedia'
    }).populate({
        path:"mltimedia",
        select:"path"
    }).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

function Delete(req,res){
    course.findByIdAndRemove(req.params.id).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

function Update(req,res){
    console.log("params  "+req.params);
    course.findByIdAndUpdate(req.params.id,req.body).then(_result=>res.json(_result))
    .catch(_err=>res.status(500).send())
}

module.exports={
    AddCourse:AddCourse,
    GetAll:GetAll,
    GetById:GetById,
    Delete:Delete,
    Update:Update,
    GetAllThree:GetAllThree
}