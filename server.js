var express = require("express");
var body = require("body-parser");
var path = require("path");
var app = express();
var exphbs = require("express-handlebars");
var db = require("./models");
var router = require(path.join(__dirname, "controllers", "controller.js"));



var PORT = process.env.PORT || 7000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(body.json()); // support json encoded bodies
app.use(body.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));

app.use("/", router);

db.User.hasMany(db.Activity);
db.Activity.belongsTo(db.User);
// Syncing our sequelize models and then starting our Express app
// { force: true }
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
