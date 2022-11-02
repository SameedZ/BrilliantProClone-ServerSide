const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Learner = require("../models/learner");
require("../config/dbconfig");

router.route("/add").post(async (req, resp) => {
  try {
    
    console.log("Route~Learner/add");
    console.table(req.body);

    Learner.init();
    const setid = new mongoose.Types.ObjectId();

    const learnerdata = new Learner({
      _id: setid,
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      dateOfBirth: req.body.birthdate,
    });

    let result = await learnerdata.save();

    if (result == null) {
      resp.status(201).send("Learner not added");
    } else {
      resp.status(200).json(result);
    }
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.route("/getcount").get(async (req, resp) => {
    try {
        console.log("Route~Learner/getcount");
        

        let result = await Learner.countDocuments({});

        if (result == null) {
            resp.status(201).send("No learners found");
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


// create route for get a learner
router.route("/get/:_id").get(async (req, resp) => {
    try {
        console.log("Route~Learner/get");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Learner.findById(req.params._id);
        

        if (result == null) {
            resp.status(201).send("Learner not found");
        } else {
            resp.status(200).json(result);
        }
    }
    catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
})   // end of get route


// create route for get all learners
router.route("/getall").get(async (req, resp) => {
    try {
        console.log("Route~Learner/getall");
        console.table(req.body);

        let result = await Learner.find();
        
        if (result == null) {
            resp.status(201).send("Learners not found");
        } else {    
            resp.status(200).json(result);
        }
    }
    catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
})

// update route for learner
router.route("/update/:_id").put(async (req, resp) => {
    try {
        console.log("Route~Learner/update");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Learner.findByIdAndUpdate(req.params._id, req.body);

        if (result == null) {
            resp.status(201).send("Learner not updated");
        } else {
            resp.status(200).json(result);
        }
    }
    catch (err) {
        console.warn(err);
    }
})

// route to delete a learner by id
router.route("/delete/:_id").delete(async (req, resp) => {
    try {
        console.log("Route~Learner/delete");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Learner.findByIdAndDelete(req.params._id);

        if (result == null) {
            resp.status(201).send("Learner not deleted");
        } else {
            resp.status(200).json(result);
        }
    }
    catch (err) {
        console.warn(err);

    }  // Sending res to client some err occured.
})




module.exports = router;
