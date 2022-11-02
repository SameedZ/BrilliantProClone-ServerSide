// create course material schema 
 const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

    const MaterialSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        courseid: { type: String, required: true, ref: 'courses' },
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },

        // for video type
        path: { type: String, default: "NULL" },
        
    },{
        versionKey:false
    });

    module.exports = mongoose.model('materials', MaterialSchema);
