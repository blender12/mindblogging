const env=require('dotenv').config();
const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors = require('cors');
const routes=require('./route/post.js');
const Port=process.env.PORT || 8080;
const app=express();
mongoose.connect(process.env.mongo_url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
mongoose.connection.on('error',()=>console.log("error connection in db")).once('open',()=>{console.log("db connected")});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'matui_prac/build')))
app.use(cors());
app.use('/mindblogging',routes);
app.get('/*',(req,res)=>{
    let url= res.sendFile(path.join(__dirname+'/matui_prac/build/index.html'))
 })

app.listen(Port,()=>{
    console.log(Port);
});