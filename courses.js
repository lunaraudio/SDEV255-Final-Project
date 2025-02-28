const db = require("../db")

const courses = db.model("Courses", {
    name: {type:String, required:true},
    description: {type:String, required:true},
    teacher: {type:String, required:true},
    credits: {type:Number, min:1, max:6, required:true}
});

module.exports = courses;