var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var unitTypeSchema = new Schema({
    name: { type: String, require: true },
    equivelantGram : {type:String}
   
}, { strict: true });
module.exports = mongoose.model("unitType", unitTypeSchema);

