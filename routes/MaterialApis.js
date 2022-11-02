const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Material = require("../models/material");
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

router.post(
  "/addcoursematerial/:courseid",
  upload.single("materialcontent"),
  async (req, resp, next) => {
    try {
      console.log("api targeted");
      console.log(req.body);

      console.log(req.file);
      // create Material schema to store the data
      Material.init();
      const setid = new mongoose.Types.ObjectId();
      const materialdata = new Material({
        _id: setid,
        courseid: req.params.courseid,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        path: req.file.path,
      });

      let result = await materialdata.save();

      if (result == null) {
        resp.status( 422).send("Conflict encountered processing your request");
      } else {
        var update = [];
        let countMaterial = await Course.findOne({
          _id: req.params.courseid,
        }).projection({ materialCount: 1, _id: 0 });
        console.log(countMaterial);
        update.push({
            $inc: { materialCount: 1 },
        });
        let result = await Course.findOneAndUpdate(
            { _id: req.params.courseid },
            { $inc: { materialCount: 1 } },
            { new: true }
        );

        resp.status(200).json(result);
      }
    } catch (err) {
      console.warn(err);
      resp.status(404).json("Err"); // Sending res to client some err occured.
    }
  }
);

router.route("/getcount").get(async (req, resp) => {
  try {
      console.log("Route~material/getcount");
      

      let result = await Material.countDocuments({});

      if (result == null) {
          resp.status(201).send("No Material found");
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


// create route to get all the material based on courseid
router.route("/getall/:courseid").get(async (req, resp) => {
  try {
    console.log("Route~Material/getall");
    console.log(req.params.courseid);
    const materialdata = await Material.find({ courseid: req.params.courseid });
    if (materialdata == null) {
      resp.status(201).send("Material not found");
    } else {
      resp.status(200).json(materialdata);
    }
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

// create a route to patch material by id
router.patch(
  "/updatecoursematerial/:_id",
  upload.single("materialcontent"),
  async (req, resp, next) => {
    try {
      console.log("Route~Material/patch");
      console.log(req.params._id);
      console.log(req.body);
      var updates = [];
      updates["path"] = req.file.path;
      let result = await Material.updateOne(
        { _id: req.params._id },
        { path: req.file.path }
      );

      if (result == null) {
        resp.status(201).send("Material not updated");
      } else {
        resp.status(200).json(result);
      }
    } catch (err) {
      console.warn(err);
      resp.status(404).json("Err"); // Sending res to client some err occured.
    }
  }
);

// create a route to delete material by id
router.route("/removecoursematerial/:_id").delete(async (req, resp) => {
  try {
    console.log("Route~Material/remove");
    console.log(req.params._id);

    let result = await Material.deleteOne({ _id: req.params._id });
    if (result == null) {
      resp.status(201).send("Material not removed");
    } else {
      resp.status(200).json(result);
    }
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

module.exports = router;
