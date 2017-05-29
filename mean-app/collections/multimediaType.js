var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var multimediaTypeSchema = new Schema({
    name: { type: String, require: true },
}, { strict: true });
module.exports = mongoose.model("multimediaType", multimediaTypeSchema);

