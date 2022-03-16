const path = require("path");
const requisicao = require("http");

/* Express */
const express = require("express");
const app = express();

/* Socket.io */
const socket = require("socket.io");

const { connectSockets } = require("../socket/mongo");
const host = requisicao.createServer(app);
const io = socket(host);
connectSockets(io);

/* Engine EJS */
app.use(express.static(path.join(__dirname, "..","public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

/* Rota */
app.use("/", (req, res) => { res.render("index.html") });

host.listen(5000, () => {console.log("Servidor hospedado na porta 5000")});