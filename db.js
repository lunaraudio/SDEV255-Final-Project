const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/classesdb");
module.exports = mongoose;
