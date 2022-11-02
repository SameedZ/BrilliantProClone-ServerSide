const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


// create Learner Schema    
const LearnerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    
},{
    versionKey:false
});




module.exports = mongoose.model('learners',LearnerSchema);