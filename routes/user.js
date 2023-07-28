const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {registerValidation,loginValidation}=require('../validation')

const bcrypt=require('bcryptjs')
router.get('/',(req,res)=>{
    res.render('home')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/register',(req,res)=>{
    res.render('register')
})
//Register a user
router.post('/register', async(req,res)=>{
   //validation of data--joi library

   const{error}=registerValidation(req.body)
   if(error) return res.status(400).send(error)

   //checking if email exist
 const emailExist=await User.findOne({email:req.body.email})
if(emailExist) return res.status(400).send("This Email Already Exist")
 //hash the password

 const salt= await bcrypt.genSalt(10)

const hashedPassword=await bcrypt.hash(req.body.password,salt)


// create a user
const newUser=new User({
    userName:req.body.userName,
    email:req.body.email,
    password:hashedPassword

})
   // save to db
   
    try{
 const userData= await newUser.save()
 res.status(201).render('login')

    }
 catch (err){
    res.status(500).send(err)
 }
})

//login logic
router.post('/login',async (req,res)=>{
  //validation of data--joi library

  const{error}=loginValidation(req.body)
  if(error) return res.status(400).send(error)
  //checking if email exist or not
  const user= await User.findOne({email:req.body.email})
  if(!user) return res.status(400).render('register')
  //password matching
  const validPassword= await bcrypt.compare(req.body.password,user.password)
if(!validPassword) return res.status(500).send("Invalid Credentials")

res.status(200).send('Profile Page')
})


 
module.exports=router