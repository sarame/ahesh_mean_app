var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
    name: { type: String, require: true },
    calorie: { type: Number }, 
    quantity: { type: Number, default: 0 },
    note: { type: String }, 
    unitType: { type: Schema.Types.ObjectId, ref: "unitType" }
}, { strict: true });
module.exports = mongoose.model("ingredient", ingredientSchema);

