const express=require('express')
const port=5000;
const app=express()
app.set("view engine", "ejs")
app.set('views',"./views")
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/signupDB",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
console.log("App is connected to DB")
}).catch((err)=>{
    console.log(`${err}`)
})


const userRoute=require('./routes/user')
app.use('/public', userRoute)





app.listen(port,(err)=>{
    if(err){
        console.log(err);

    }
    else{
        console.log(`Server is listen on ${port}`)
    }
})