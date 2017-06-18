var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ingredientSchema = new Schema({
    name: { type: String, require: true },
    calorie: { type: Number },
    quantity: { type: Number, default: 0 },
    note: { type: String },
    unitType: { type: Schema.Types.ObjectId, ref: "unitType" },
    fats: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbohydrate: { type: Number, default: 0 },
    vitaminA: { type: Number, default: 0 },
    vitaminC: { type: Number, default: 0 },
    vitaminD: { type: Number, default: 0 },
    vitaminE: { type: Number, default: 0 },
    iron: { type: Number, default: 0 },
    calcium: { type: Number, default: 0 },
    magnesium: { type: Number, default: 0 },
    phosphorus: { type: Number, default: 0 },
    potassium: { type: Number, default: 0 },
    zinc: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    tags: [{type: Schema.Types.ObjectId, ref: "tag"}]    
}, { strict: true });
module.exports = mongoose.model("ingredient", ingredientSchema);

