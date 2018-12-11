/*
npm init
npm install express -save
npm install ejs -save
npm install body-parser -save
npm install mongoose -save
npm install
*/
var express 		= require("express");
var expressLayout	= require("express-ejs-layouts");
//var session			= require("express-session");
var path 			= require("path");
var controllers		= require("./controllers/controllers");
var bodyParser		= require("body-parser");

var app	= express();

//set up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set up layout
app.use(expressLayout);

//set secret
/*app.use(session({
  secret: "azisalvriyanto",
  saveUninitialized: true,
  resave: true
}));*/

//static files
app.use(express.static("./public"));

//fire controllers
app.use(bodyParser.urlencoded({ extended: true }));

//gas
controllers(app);

//listen to port
app.listen(1337, function () {
	console.log("You are listening to port 1337\n=> Mencoba menghubungkan ke database.");
});

module.exports = app;