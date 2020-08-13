const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});


///////// THE CODE START HERE ////////

const todoSchema = {
    name: String
}; 

const Item = mongoose.model("Item", todoSchema);
const item1 = new Item({
    name: "Welcome"
});
const item2 = new Item({
    name: "Welcomeeee"
});
const item3 = new Item({
    name: "Welcomeeeee"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [todoSchema]
};

const List = mongoose.model("List", listSchema);

app.get('/', function(req, res) {

    Item.find({}, function(err, foundItems) {
        if (foundItems.length === 0) {
           Item.insertMany(defaultItems, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully default items to database");
            }
        }); 
        res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", todo: foundItems});
        }
    });
});

app.get("/:customListName", function(req, res) {
    const customListName = req.params.customListName;

    List.findOne({name: customListName}, function(err, foundList) {
        if (!err) {
            if (!foundList) {
                //Create New List
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
            
                list.save();
                res.redirect("/" + customListName);

            } else {
                //Show List
                res.render("list", {listTitle: customListName, todo: foundList.items})
            }
        }
    });


});

app.post("/", function(req, res) {
    let todoItem = req.body.todo;
    let listName = req.body.list

    const item = new Item({
        name: todoItem
    });

    if (listName === "Today") {
        item.save();

        res.redirect("/");   
    } else {
        List.findOne({name: listName}, function(err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
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

app.post("/delete", function(req, res) {
    const checkItemId = (req.body.delete);
    Item.findByIdAndRemove(checkItemId, function(err){
        if (!err) {
            console.log("Todo Deleted");
        }
    });
    res.redirect("/");
});








