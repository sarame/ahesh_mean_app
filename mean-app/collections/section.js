var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sectionSchema = new Schema({
    text: { type: String },
    title: { type: String },
    mltimedia:[{type: Schema.Types.ObjectId, ref: "multimedia"}]
}, { strict: true });
module.exports = mongoose.model("section", sectionSchema);

