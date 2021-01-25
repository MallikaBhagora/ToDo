const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var titles = ["add","delete","update"];
//var descriptions =[];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindDay: day,
    newTitles: titles,
    //  newDescriptions:descriptions
  });
});

app.post("/", function(req, res) {
  var title = req.body.title;
  //  var description = req.body.description;

  titles.push(title);
  //  descriptions.push(description);

  res.redirect("/");
});


app.listen(3000, function(req, res) {
  console.log("Server started at port 3000");
});
