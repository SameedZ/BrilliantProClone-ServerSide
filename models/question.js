// create course material schema 
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const QuestionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // create assessmentid of type string ref to assessment
    assessmentid: { type: String, required: true , ref: 'assessments' },
    questionStatement: {type: String, require},
    options: {type: Array, default:[]},
    correctOption: {type: String, require:true}
    
},{
    versionKey:false
});

module.exports = mongoose.model('questions', QuestionSchema);
