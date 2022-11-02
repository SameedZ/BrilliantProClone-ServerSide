// create Enrollment Schema
const mongoose = require('mongoose');   
const { required } = require('nodemon/lib/config');

const EnrollmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseid: { type: String, required: true, ref: 'courses' },
    learnerid: { type: String, required: true , ref: 'learners'},
    status: { type: String, default: 'inactive' }, // status if started or not
    startdate: { type: String, required: true },
    enddate: { type: String, default:"NULL" },
    progress: { type: String, default: "0" }, // progress of the course
    certificateurl: { type: String, default:"NULL"}, // certificate url of the course
    certificateid: { type: String, default: "NULL"}, // certificate id of the course
    rating : { type: String, default: "NULL" },
},{
    versionKey:false
});




module.exports = mongoose.model('enrollments',EnrollmentSchema);