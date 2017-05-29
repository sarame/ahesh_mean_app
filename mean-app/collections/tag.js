var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: { type: String }
}, { strict: true });
module.exports = mongoose.model("tag", tagSchema);

