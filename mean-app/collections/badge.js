var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var badgeSchema = new Schema({
    name: { type: String, require: true },
    img: { type: String }, // comment hna hn7ot el default value bta3 el image
    noRecipe: { type: Number, default: 0 }
}, { strict: true });
module.exports = mongoose.model("badge", badgeSchema);

