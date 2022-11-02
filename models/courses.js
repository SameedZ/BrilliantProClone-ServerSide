// make schema for course model
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

// create Learner Schema    
const CourseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    issueDate : { type: String, required: true }, // provided by the server
    price : { type: String, required: true },
    description : { type: String, required: true },
    image : { type: String , default: "uploads/77755e565ef7ddbff2546231cd8732bf.jpg" },
    category : { type: String, required: true },
    subcategory : { type: String, required: true },
    tags : { type: String, required: true },
    rating : { type: String, default: "NULL" },
    materialCount : { type: Number , default: 0 },

},{
    versionKey:false
});

module.exports = mongoose.model('courses',CourseSchema);