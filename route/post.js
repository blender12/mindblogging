const express=require('express');
const routes=express.Router();
const multer = require('multer');
var upload = multer();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
var path=require('path');
const postApi=require('../controller/post_api');
const userApi=require("../controller/user_api");
const db=require('../controller/db.js');
const auth=require('../middleware/auth.js');

/*var storage=multer.diskStorage({
    destination: function (req,file,don){
        don(null,'./matui_prac/src/upload');
    },
    filename:function(req,file,don){
        don(null,file.fieldname+Math.random()*2+path.extname(file.originalname));
    }
    
});*/

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
    });

  const storage =new CloudinaryStorage({
        cloudinary: cloudinary,
        folder: "demo",
        allowedFormats: ["jpg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
        });


 upload = multer({ storage: storage });



routes.get('/posts',postApi.showPosts);

routes.post('/addpost',auth,upload.fields([{name:'title'},{name:'content'},{name:'blogImg'},{name:"user_id"}]),postApi.addPost);


routes.put('/editpost/:data',auth,upload.fields([{name:'title'},{name:'content'},{name:'blogImg'},{name:'imgname'},{name:"imgurl"}]),postApi.editPost);

routes.get('/comment/:data',postApi.getcomment);
routes.post('/addcomment/:data',auth,upload.fields([{name:'comment'},{name:'avatar'},{name:'username'}]),postApi.addComment);
routes.delete('/deletecomment/:data',auth,postApi.deleteComment);
routes.delete('/deletepost/:post',auth,postApi.deletePost);
routes.put('/like/:data',auth,postApi.likes);
routes.get('/profile/:post',auth,postApi.profile);

routes.post('/signin',userApi.signin);

routes.post('/refreshtoken',userApi.refreshToken);

routes.get('/logout',userApi.logOut);

routes.get('/test',(req,res)=>{
    let post=db.Post.exists({$and:[{_id:"602376224b0f661908bc47f7"},{user_info:{$in:["602375b84b0f661908bb47f6"]}}]});
    if(post){
        console.log("yipeeee");
    }
    res.send("okk")
})

routes.get('/post/:data',postApi.showOnePost);


module.exports=routes;