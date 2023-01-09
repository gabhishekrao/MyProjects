const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const validator = require("validator");

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    // example: iith,
  },

  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  },

  mobile: {
    type: String,
    required: true,
    unique: true,
    // minlength: 10,
    // maxlength: 10,
    trim: true,
    validate: {
      validator: validator.isMobilePhone,
      msg: "Please provide valid phone Number",
    },
  },

  collegeId: {
    type: ObjectId,
    ref: "College",
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Intern", internSchema);
