const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();
var server = require('http').createServer(app);

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/keys").mongo_URI;

var SocketSingleton = require('./src/socket-singleton');
SocketSingleton.configure(server); 

// Mapping users to sockets (could have multiple sockets for a single user)
const userIdToSocket = {};
const socketToUserId = {};

SocketSingleton.io.on('connection', (socket) => {
  // Remember the PersonId connected to each socket
  socket.on('identify', (data) => {
    console.log(`User ${data.user_id} connected`);

    userIdToSocket[data.user_id] = socket.id;
    socketToUserId[socket.id] = data.user_id;
  });

  socket.on('message', (data) => {
    console.log(`message ${data.message}`)
  });
});

const users = require("./src/routes/apis/users");
const profile = require("./src/routes/apis/profiles");
const chats = require("./src/routes/apis/chats");
const match = require("./src/routes/apis/match");

//CONNECT TO MONGODB
mongoose
  .connect(
    db, { useNewUrlParser: true })
  .then(() => {
    console.log("connect mongo")
  })
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());


//Passport config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/chats", chats);
app.use("/api/match", match);

// SERVER STATIC ASSETS IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
