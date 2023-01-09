const express = require("express");

const router = express.Router();

const collegeController = require("../controllers/collegeController");

const interController = require("../controllers/internController");

router.post("/functionup/colleges", collegeController.createCollege);

router.post("/functionup/interns", interController.createIntern);

router.all("/*", (req, res) => {
  res.status(400).send({ msg: "plz send correct url" });
});

module.exports = router;
