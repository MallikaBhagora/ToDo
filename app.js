const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-mallika:test123qwerty@cluster0.cttrv.mongodb.net/todolistDB",{useNewUrlParser:true} );
const titleSchema ={
  name: String
};
const Title = mongoose.model("Title",titleSchema);

const title1 = new Title({
  name: "Welcome to your ToDo List!"
});
const title2 = new Title({
  name: "Hit Enter or + button to add a new item."
});
const title3 = new Title({
  name: "<-- Hit this to delete an item."
});

const defaultTitle = [title1, title2, title3];

app.get("/", function(req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);


  Title.find({},function(err, foundItems){

    if(foundItems.length === 0){
      Title.insertMany(defaultTitle,function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully saved default items to DB.");
          }
      });
      res.redirect("/");
    }
    else{
      res.render("list", {
        kindDay: day,
       newTitles: foundItems
        //  newDescriptions:descriptions
      });
    }


  });

});

app.post("/", function(req, res) {
  const titleName = req.body.title;
  //  var description = req.body.description;

  const title = new Title({
    name: titleName
  });
  title.save();
  //  descriptions.push(description);

  res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkbox;

  Title.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("Successfully deleted checked item");
      res.redirect("/");
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started Successfully.");
});
