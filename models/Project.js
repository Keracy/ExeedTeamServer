const mongoose = require("mongoose");
const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Enter a title"],
  },
  status: {
    type: String,
    trim: true,
    required: [true, "Enter a status"],
  },
  devs: {
    type: Array,
    required: [true, "Enter a DevsList"],
  },
  rate: {
    type: String,
    trim: true,
    required: [true, "Enter a rate"],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
