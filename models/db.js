const mongoose = require('mongoose');

const uri = "mongodb+srv://norwayfdf:khsrk@coursesdb.3qlr5.mongodb.net/coursesDB?retryWrites=true&w=majority&appName=CoursesDB";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Successfully connected to MongoDB!");
})
.catch((err) => {
    console.error("Connection error", err);
});

module.exports = mongoose;