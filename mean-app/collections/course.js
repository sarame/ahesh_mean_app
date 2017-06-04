var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: { type: String },
    description: { type: String }, 
    courseOutcome: { type: String }, 
    whyThisCourse: { type: String }, 
    img: { type: String },
    sections:[{type:Schema.Types.ObjectId, ref:"section" }],
  
}, { strict: true });
module.exports = mongoose.model("course", courseSchema);

