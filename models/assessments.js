// make schema for course model
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

// create Learner Schema    
const AssessmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    timeDuration: {type:String, require},
    passingMarks: {type:Number, require},
    questionCount: {type:Number, require},
},{
    versionKey:false
});

module.exports = mongoose.model('assessments',AssessmentSchema);