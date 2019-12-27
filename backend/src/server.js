const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

mongoose.connect(
  "mongodb://omnistack:omnistack@cluster0-shard-00-00-ayg2h.mongodb.net:27017,cluster0-shard-00-01-ayg2h.mongodb.net:27017,cluster0-shard-00-02-ayg2h.mongodb.net:27017/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
