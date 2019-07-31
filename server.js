const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
var socketio = require("socket.io");
var http = (http = require("http"));

const Profile = require("./src/db/models/Profile");
const User = require("./src/db/models/User");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/keys").mongo_URI;

var server = http.createServer(app);
var io = socketio.listen(server);
app.set("socketio", io); // <-- bind socket to app

// Mapping users to sockets
const userIdToSocket = {};
const socketToUserId = {};

io.on("connection", socket => {
  // Remember the PersonId connected to each socket
  socket.on("identify", data => {
    console.log(`User ${data.id} connected`);

    userIdToSocket[data.id] = socket.id;
    socketToUserId[socket.id] = data.id;
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

const routerInfo = model => ({
  model,
  io,
  userIdToSocket
});

const UserRoute = require("./src/routes/apis/users")(routerInfo(User));

const users = require("./src/routes/apis/users");
const profile = require("./src/routes/apis/profiles");
const chats = require("./src/routes/apis/chats");
const match = require("./src/routes/apis/match");

//CONNECT TO MONGODB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("connect mongo");
  })
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", UserRoute);
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
  console.log(`Server running on port ${port}`);
});
