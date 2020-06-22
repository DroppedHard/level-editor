var express = require("express")
var bodyParser = require("body-parser")
var app = express()
const PORT = 3000;
var levels = []
var path = require("path")

app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hex", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/hex.html"))
})
app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/game.html"))
})
app.get("/pm", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/pm.html"))
})
app.get("/am", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/am.html"))
})
app.post("/handlePost", function (req, res) {
    levels.push(req.body)
    res.send(levels)
})
app.post("/loadLevels", function (req, res) {
    res.send(levels)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})