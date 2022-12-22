// loading modules
const express = require("express");
const dotenv = require("dotenv");  // Used to store config variable inside a config.env file
const morgan = require("morgan");  // Used to create log request on console
const bodyparser = require("body-parser");  
const path = require("path");

// Creating a object of a express class
const app = express()

// specifying path to config.env file
dotenv.config({path:"config.env"});
// importinf variable from config file
const PORT = process.env.PORT || 8080;

// log request
app.use(morgan("tiny"));

// parse request to body parser
app.use(bodyparser.urlencoded({extended:true}));

// set view engine to ejs
app.set("view engine", "ejs");

// set path to view directory
app.set("views", path.resolve(__dirname, "views"));

// load assets 
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.get("/add-user", (req,res)=>{
    res.render("add_user");
})

app.get("/update-user", (req,res)=>{
    res.render("update_user");
})

app.listen(PORT, ()=>{
    console.log(`Server is listining at port no ${PORT}`);
})