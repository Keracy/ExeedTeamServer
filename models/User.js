const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Enter a name"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Enter a phone"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Enter a email"],
  },
});

module.exports = mongoose.model("Employees", EmployeeSchema);
