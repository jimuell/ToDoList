const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let todoItems = ["Yow!", "Nope"];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});



///////// THE CODE START HERE ////////

app.get('/', function(req, res) {
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-PH", options);

    res.render("list", {kindOfDay: day, todo: todoItems});
});

app.post("/", function(req, res) {
    let todoItem = req.body.todo;
    todoItems.push(todoItem);
    res.redirect("/");
});