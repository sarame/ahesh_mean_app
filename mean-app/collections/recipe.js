var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var recipeSchema = new Schema({

    name: { type: String, require: true },
    img: { type: String }, // comment hna hn7ot el default value bta3 el image
    avgRate: { type: Number, default: 0 },
    noReviews: { type: Number, default: 0 },
    noViews: { type: Number, default: 0 },
    durationTime: { type: Number, require: true },
    totalCalories: { type: Number, default: 0 },
    time: { type: String },
    date: { type: String },
    description: { type: String, require: true },
    size: { type: Number, default: 1 },
    video : {type:String },//added now
    user: { type: Schema.Types.ObjectId, ref: "user" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "review" }],
    sections :[{
            sectionNumber: {type : Number},
            ingerdients:[{ 
                    ingredient: { type: Schema.Types.ObjectId, ref: "ingredient"},
                    unitType: { type:Schema.Types.ObjectId, ref: "unitType" },
                    qunatity: { type:Number }
                }],
            steps:[
                {
                    stepNo: {type: Number},
                    text: {type:String},
                    ingredientLinks:[{type: Schema.Types.ObjectId, ref: "ingredient" }],
                    sectionsLinks: [{type: Schema.Types.ObjectId, ref: "section" }]
                }
            ]
        }
    ], 
    tags:[{type: Schema.Types.ObjectId, ref: "tag"}]
}, { strict: true });
module.exports = mongoose.model("recipe", recipeSchema);

