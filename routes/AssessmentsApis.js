const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Assessment = require("../models/assessments");
require("../config/dbconfig");

router.route('/add').post(async (req, res) => {
    try {
        console.table(req.body)

        Assessment.init();
        const id = new mongoose.Types.ObjectId();

        const assessmentData = new Assessment({
            _id: id,
            title: req.body.title,
            timeDuration: req.body.timeDuration,
            passingMarks: req.body.passingMarks
        })

        let result = await assessmentData.save();
        if (result == null) {
            res.status(201).send("Enrollment not added");
        } else {
            res.status(200).json(result);
        }


    } catch(err) {
        console.warn(err);
        res.status(404).json("Err");
    }
})


router.route("/get/:_id").get(async (req, res) => {
    try {
        console.log("Route~Assessment/get");
        

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            res.status(400).send("Invalid id");
        }

        let result = await Assessment.findById({_id:req.params._id});
        if (result == null) {
            res.status(201).send("Assessment not found");
        }
        else {
            res.status(200).json(result);
        }


    } catch (err) {
        console.warn(err);
        res.status(404).json("Err"); // Sending res to client some err occured.

    }
});

// create route to get all courses
router.route("/getall").get(async (req, resp) => {
    try {
        console.log("Route~Assessment/getall");
        console.table(req.body);

        let result = await Assessment.find({});

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

// del assessment.

router.route("/remove/:id").delete(async (req, res) => {
    try {
        console.log("Route~Assessment/remove");
        console.table(req.body);

        let result = await Assessment.deleteOne({ _id: req.params.id });

        if (result == null) {
            res.status(201).send("Assessment not removed");
        }
        else {
            res.status(200).json(result);
        }


    } catch (err) {
        console.warn(err);
        res.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);

// update assessment:
router.route("/update/:id").put(async (req, resp) => {
    try {
        console.log("Route~Assessment/update");
        console.table(req.body);

        let result = await Assessment.updateOne({ _id: req.params.id }, { $set: req.body });

        if (result == null) {
            resp.status(201).send("Assessment not updated");
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