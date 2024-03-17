const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const EmployeeModal = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail) {
          throw new error("Please Enter Valid Email !!!");
        }
      },
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeModal);
