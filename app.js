const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter')
const port  = process.env.port || 7070;

const app  = express();

// db con

mongoose.connect('mongodb://localhost:27017/learningdata',{useNewUrlParser:true})
const db = mongoose.connection;

db.on("error",()=>{console.log("error in conection");})
db.once('open',()=>{console.log("Connected");})

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', homeRouter)

app.get('/views/course.ejs',function(req,res){
  res.render('course')
})

app.get('/views/register.ejs',function(req,res){
  res.render('register')
})

app.get('/views/tasks.ejs',function(req,res){
  res.render('tasks')
})

app.get('/views/profile.ejs',function(req,res){
  res.render('profile')
})

app.get('/views/dashbord.ejs',function(req,res){
  res.render('dashbord')
})

app.listen(port)