const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let todoItems = ["Yow!", "Nope"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});




///////// THE CODE START HERE ////////

app.get('/', function(req, res) {
    let day = date.getDate();
    
    res.render("list", {listTitle: day, todo: todoItems});
});

app.post("/", function(req, res) {
    let todoItem = req.body.todo;

    if (req.body.list === "Work") {
        workItems.push(todoItem);
        res.redirect("/work");
    } else {
        todoItems.push(todoItem);
        res.redirect("/");
    }

});

app.get('/work', function(req, res) {
    res.render("list", {listTitle: "Work List", todo: workItems});
});

app.post("/work", function(req, res) {
    let todoItem = req.body.todo;
    workItems.push(todoItem);
    res.redirect("/");
});

app.get('/about', function(req, res) {
    res.render("about");
});








