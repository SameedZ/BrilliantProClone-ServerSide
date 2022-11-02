// Including the Express Server
const express = require('express');
const app = express();
// Including cors
const cors = require("cors"); 
// Server Usage
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static('uploads'));


// Connecting to the MongoDb Atlas database
require('./config/dbconfig');

// Importing All Router Api's
var LearnerApis = require('./routes/LearnerApi');
var CourseApis = require('./routes/CoursesApis');
var EnrollmentApis = require('./routes/EnrollmentApis');
var MaterialApis = require('./routes/MaterialApis');
var AssessmentApis = require('./routes/AssessmentsApis');
var Question = require('./routes/QuestionsApis');


// Routed Api
app.use('/learners',LearnerApis);
app.use('/enrollments',EnrollmentApis);
app.use('/courses',CourseApis);
app.use('/materials',MaterialApis);
app.use('/assessments',AssessmentApis);
app.use('/questions', Question);

// listening @ 5000 port
app.listen(5000);