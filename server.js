const express = require("express");
const mongoose = require("mongoose");

const users = require("./src/routes/apis/users");
const profile = require("./src/routes/apis/profiles");
const chats = require("./src/routes/apis/chats");

const app = express();

//DB CONFIG
const db = require("./config/mongoURI");

//CONNECT TO MONGODB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Sup"));

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/chats", chats);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
