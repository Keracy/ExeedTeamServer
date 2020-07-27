const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());
app.use(cors("*"));

const employeesRoute = require("./routes/employees");
app.use("/employees", employeesRoute);

const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

const projectsRoute = require("./routes/projects");
app.use("/projects", projectsRoute);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

app.listen(process.env.PORT);
