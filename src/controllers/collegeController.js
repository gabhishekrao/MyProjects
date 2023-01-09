const express = require("express");
const collegeModel = require("../models/college");
const internModel = require("../models/intern");

let validate = /^([a-z A-Z ]){2,100}$/;

let urlValidate = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

const createCollege = async (req, res) => {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0)
      return res.status(400).send({status:false, Error:"Please send data in the Body"});

    const { name, fullName, logoLink } = data;

    if (!name || !validate.test(name)) {
      return res
        .status(400)
        .send({ status: false, Error: "Please provide valid Name" });
    }

    let checkName = await collegeModel.findOne({ name: name });

    if (checkName) {
      return res
        .status(400)
        .send({ status: false, Error: "College Name already exist" });
    }

    console.log("checkname", checkName);

    if (!fullName || !validate.test(fullName)) {
      return res
        .status(400)
        .send({ status: false, Error: "Please provide valid full Name" });
    }

    let checkFullName = await collegeModel.findOne({ fullName: fullName });

    if (checkFullName) {
      return res
        .status(400)
        .send({ status: false, Error: "College Name already in use" });
    }

    if (!logoLink || !urlValidate.test(logoLink)) {
      return res
        .status(400)
        .send({ status: false, Error: "Please provide valid url link" });
    }

    let createData = await collegeModel.create(data);

    return res.status(201).send({ status: true, data: createData });
  } catch (err) {
    console.log("Error in create College", err.message);

    res.status(500).send({ status: false, Error: err.message });
  }
};

const getCollege = async (req, res) => {
  try {
    let collegeName = req.query.collegeName;

    if (Object.keys(req.query).length === 0)
      return res.status(400).send({ status: false, Error: "Please send query" });

    if (!collegeName)
      return res.status(400).send({status:false, Error: "Please enter valid filter" });

    let findCollege = await collegeModel
      .findOne({
        name: collegeName,
        isDeleted: false,
      })
      .select({ name: 1, fullName: 1, logoLink: 1, _id: 0 });

    if (!findCollege) return res.status(404).send({status:false, Error: "College not found" });

    let internsss = await internModel.find({ collegeId: findCollege._id });

    let newData = {
      name: findCollege.name,
      fullName: findCollege.fullName,
      logoLink: findCollege.logoLink,
      interns: internsss,
    };

    return res.status(200).send({status: false, result: newData });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports = { createCollege, getCollege };
