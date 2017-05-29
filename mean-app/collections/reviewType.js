var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var reviewTypeSchema = new Schema({
    type: { type: String, require: true },
    value: {type: Number, default:0}
}, { strict: true });
module.exports = mongoose.model("reviewType", reviewTypeSchema);

