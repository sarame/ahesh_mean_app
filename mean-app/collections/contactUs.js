var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var contactUsSchema = new Schema({
    name: { type: String, require: true },
    email : { type : String },
    message : { type :String , require:true }
}, { strict: true });
module.exports = mongoose.model("contactUs", contactUsSchema);

