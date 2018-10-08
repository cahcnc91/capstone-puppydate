const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./src/routes/apis/users");
const profile = require("./src/routes/apis/profiles");
const chats = require("./src/routes/apis/chats");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/mongoURI");

//CONNECT TO MONGODB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/chats", chats);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
