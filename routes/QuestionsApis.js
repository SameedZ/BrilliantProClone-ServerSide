const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require("../models/question");
require("../config/dbconfig");

router.route('/add').post(async (req, res) => {
    try {   
        console.log("Route~Question/add");    
        console.table(req.body);

        Question.init();
        const id = new mongoose.Types.ObjectId();
        const questionData = new Question({
            _id: id,
            questionStatement: req.body.questionStatement,
            assessmentid: req.body.assessmentid,
            options: req.body.options,
            correctOption: req.body.correctOption
        })
        let result = await questionData.save();
        // increment question count in assessment
        

        if (result == null) {
            res.status(201).send("Question not added");
        } else {
            res.status(200).json(result);
        }

    } catch (err) {
        console.warn(err);
        res.status(404).json("Err");
    }
})

router.route("/getAllQuestions/:assessmentId").get(async (req, resp) => {
    try {
        console.log("Route~Question/get");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params.assessmentId)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Question.find({ assessmentId: req.params.assessmentId }).count();


        if (result == null) {
            resp.status(201).send("Questions not found");
        } else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);

        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);

// get question:
router.route("/get/:_id").get(async (req, res) => {
    try {
        console.log("Route~Question/get");
        

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            res.status(400).send("Invalid id");
        }

        let result = await Question.findById({_id:req.params._id});
        if (result == null) {
            res.status(201).send("Question not found");
        }
        else {
            res.status(200).json(result);
        }


    } catch (err) {
        console.warn(err);
        res.status(404).json("Err"); // Sending res to client some err occured.

    }
});

// create route to get all assessments
router.route("/getall").get(async (req, resp) => {
    try {
        console.log("Route~Assessment/getall");
        console.table(req.body);

        let result = await Question.find({});

        if (result == null) {
            resp.status(201).send("No Question found");
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

// del Question.

router.route("/remove/:id").delete(async (req, res) => {
    try {
        console.log("Route~Question/remove");
        console.table(req.body);

        let result = await Question.deleteOne({ _id: req.params.id });

        if (result == null) {
            res.status(201).send("Question not removed");
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

// update Question:
router.route("/update/:id").put(async (req, resp) => {
    try {
        console.log("Route~Question/update");
        console.table(req.body);

        let result = await Question.updateOne({ _id: req.params.id }, { $set: req.body });

        if (result == null) {
            resp.status(201).send("Question not updated");
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
