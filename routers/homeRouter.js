const express = require('express');
const { MongoDecompressionError } = require('mongodb');
const Router  = express.Router();
const homeSchema = require('../models/homeSchema');

Router.get('/',(err,res)=>{
    res.render('register',{title :'',password:'',email:''})
})

Router.post('/register',async(req,res)=>{
   try{
       const {
           name,
           number,
           email,
           password,
           cpassword
       } = req.body;

    if(password === cpassword ){
       
         const userData = new homeSchema({
            name,
            number,
            email,
            password
         })
         userData.save(err=>{
             if(err){
                console.log("err")
             }else{
                res.render('register',{title :'',password:'',email:'Registered Successfully'})
             }
         })
       
    const useremail = await homeSchema.findOne({email:email});
     if(email === useremail.email){
        res.render('register',{title :'',password:'',email:'Email Already exists'})
     }else{
         console.log('err')
     }

    }else{
        res.render('register',{title :'',password:'Password not Matching',email:''})
    }
   }catch(error){

    res.render('register',{title :'',password:'Fill all the fields',email:'fill all the fields'})
   }
})

// singin 

Router.post('/login',(req,res)=>{
    
    const {
        email,
        password    
    } = req.body;

    homeSchema.findOne({email:email},(err,result)=>{
        
        if(email === result.email && password === result.password){
            res.render('dashbord', {name : result.name})
            res.render('course',{name : result.name})
            res.render('tasks',{name : result.name})
            res.render('register',{name : result.name})
        }else{
            console.log(err)

        }
    })
})
/*
//profile
Router.get('/profile',(req,res)=>{
    homeSchema.find((err,docs)=>{
        if(err) throw err;

        res.render('profile',{
            registerusers : docs
        })
    })
})
*/
module.exports = Router;