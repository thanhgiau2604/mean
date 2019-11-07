var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var morgan = require("morgan");
var mongoose = require("mongoose");
var config = require("./config");
var path = require("path");
//app config
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//config handle CORS req
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
//log all req to console
app.use(morgan('dev'));
mongoose.Promise = global.Promise;
mongoose.connect(config.database,{useNewUrlParser:true});
mongoose.set('useCreateIndex',true);
//set Static file location
app.use(express.static(__dirname+"/public"));
//ROUTES FOR OUR API
//API ROUTES
var apiRoutes = require("./app/routes/api")(app,express);
app.use('/api',apiRoutes);
//Main route
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+"/public/app/views/pages/index.html"));
});
app.get("/dashboard",function(req,res){
    res.sendFile(path.join(__dirname+"/public/app/views/pages/dashboard.html"));
})

app.get("/signup",function(req,res){
    res.sendFile(path.join(__dirname+"/public/app/views/pages/signup.html"));
})
//START THE SERVER
app.listen(config.port);
console.log('Dang dung PORT ',config.port);    
