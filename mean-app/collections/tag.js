var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: { type: String },
    recipes : [{type: Schema.Types.ObjectId, ref: "recipe"}]
}, { strict: true });
module.exports = mongoose.model("tag", tagSchema);

