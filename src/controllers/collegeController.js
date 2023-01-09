const express = require("express");
const collegeModel = require("../models/college");

let validate = /^([a-z A-Z ]){2,100}$/;

let urlValidate = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

const createCollege = async (req, res) => {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0)
      return res.status(400).send("Please send data in the Body");

    const { name, fullName, logoLink } = data;

    if (!name || !validate.test(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid Name" });
    }

    let checkName = await collegeModel.findOne({ name: name });

    if (checkName) {
      return res
        .status(400)
        .send({ status: false, msg: "College Name already exist" });
    }

    console.log("checkname", checkName);

    if (!fullName || !validate.test(fullName)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid full Name" });
    }

    let checkFullName = await collegeModel.findOne({ fullName: fullName });

    if (checkFullName) {
      return res
        .status(400)
        .send({ status: false, msg: "College Name already in use" });
    }

    if (!logoLink || !urlValidate.test(logoLink)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid url link" });
    }

    let createData = await collegeModel.create(data);

    return res.status(400).send({ status: true, data: createData });
  } catch (err) {
    console.log("Error in create College", err.message);

    res.status(500).send({ status: false, Error: err.message });
  }
};

const getCollege = async (req, res) => {
  let filter = req.body;

  collageName = req.query.collageName;

  if (!collageName)
    return res.status(400).send({ msg: "plz enter valid filter" });

  let checkCollege = await college
    .findOne({ name: collageName })
    .populate("interns");

  if (!checkCollege) return res.status(404).send({ msg: "college not found" });

  let collegeDetails = await college.find();

  if (Object.keys(filter).length === 0)
    return res.status(200).send(collegeDetails);

  let checkStatus = checkCollege.interns.filter((x) => {
    return x.isDeleted == false;
  });

  if (checkCollege.interns.length === 0)
    res
      .status(200)
      .send({
        result: checkCollege,
        msg: "no interns applied for this college",
      });

  return res.status(200).send({ result: checkStatus });
};

module.exports = { createCollege, getCollege };
