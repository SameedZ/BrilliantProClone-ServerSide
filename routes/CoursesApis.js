const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/courses");
require("../config/dbconfig");

const {
    upload,
    fileFilter,
    storage,
    multer,
    uploadCourseMaterial,
  } = require("../helper/fileuploading.js");
  require("../helper/fileuploading");


// create route to add a course

 router.post(
  "/add",
  upload.single("image"),
  async (req, resp, next) => {
//router.route("/add").post(async (req, resp) => {
    try {
        console.log("Route~Course/add");
        console.table(req.body);
        console.log("File",req.file);
        console.log("File Path",req.file.path);

        Course.init();
        const setid = new mongoose.Types.ObjectId();

        // create a date object of current date
        const issueDate = new Date().toISOString().slice(0, 10);
      
        const coursedata = new Course({
            _id: setid,
            title: req.body.title,
            author: req.body.author,
            issueDate: issueDate,
            price: req.body.price,
            description: req.body.description,
            image : req.file.path,
            category: req.body.category,
            subcategory: req.body.subcategory,
            tags: req.body.tags

        });

        let result = await coursedata.save();

        if (result == null) {
            resp.status(201).send("Course not added");
        }
        else {
            resp.status(200).json(result);
        }


    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
} );


// create route to get course by id
router.route("/get/:_id").get(async (req, resp) => {
    try {
        console.log("Route~Course/get");
        

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Course.findById({_id:req.params._id});
        if (result == null) {
            resp.status(201).send("Course not found");
        }
        else {
            resp.status(200).json(result);
        }


    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.

    }

});


// create route to get all courses
router.route("/getall").get(async (req, resp) => {
    try {
        console.log("Route~Course/getall");
        console.table(req.body);

        let result = await Course.find({});

        if (result == null) {
            resp.status(201).send("No courses found");
        }
        else {
            resp.status(200).json(result);
        }

    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);

// create a route to get the count of the courses
router.route("/getcount").get(async (req, resp) => {
    try {
        console.log("Route~Course/getcount");
        

        let result = await Course.countDocuments({});

        if (result == null) {
            resp.status(201).send("No courses found");
        }
        else {
            console.log(result);
            resp.status(200).json(result);
        }

    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.

    }
});



// create route for removing a course by id
router.route("/remove/:id").delete(async (req, resp) => {
    try {
        console.log("Route~Course/remove");
        console.table(req.body);

        let result = await Course.deleteOne({ _id: req.params.id });

        if (result == null) {
            resp.status(201).send("Course not removed");
        }
        else {
            resp.status(200).json(result);
        }


    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);

// create a route for updating a course by id
router.route("/update/:id").put(async (req, resp) => {
    try {
        console.log("Route~Course/update");
        console.table(req.body);

        let result = await Course.updateOne({ _id: req.params.id }, { $set: req.body });

        if (result == null) {
            resp.status(201).send("Course not updated");
        }
        else {
            resp.status(200).json(result);
        }

    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
});



module.exports = router;