var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: { type: String },
    description: { type: String }, 
    img: { type: String }
}, { strict: true });
module.exports = mongoose.model("course", courseSchema);

