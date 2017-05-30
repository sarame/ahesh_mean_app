var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({

    name: { type: String, require: true },
    img: { type: String }, // comment hna hn7ot el default value bta3 el image
    recipesNo: { type: Number, default: 0 },
    authonticationId: { type: String },
    email: { type: String },
    password: { type: String },
    bio: { type: String },
    recipes: [{ type: Schema.Types.ObjectId, ref: "recipe" }],
    fevRecipes: [{ type: Schema.Types.ObjectId, ref: "recipe" }],
    shoppingList: [{ type: Schema.Types.ObjectId, ref: "ingredient" }],
    enrolledCourse: [{
        course: { type: Schema.Types.ObjectId, ref: "course" },
        visitedSections:  [{type:Schema.Types.ObjectId, ref:"section" }]
    }],
    badges: [{
        badgeid: { type: Schema.Types.ObjectId, ref: "badge" }, 
        date: { type: String },
        time: { type: String }
    }]

}, { strict: true });

module.exports = mongoose.model("user", userSchema);

