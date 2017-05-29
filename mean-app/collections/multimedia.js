var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var multimediaSchema = new Schema({
    typeMulti: { type: Schema.Types.ObjectId , ref:"multimediaType"},
    path: {type:String }
}, { strict: true });
module.exports = mongoose.model("multimedia", multimediaSchema);
