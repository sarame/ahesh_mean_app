var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    reviewType: [{ type: Schema.Types.ObjectId, ref: "reviewType" }]
}, { strict: true });
module.exports = mongoose.model("review", reviewSchema);

