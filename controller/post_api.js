const db=require('./db.js');
const fs=require('fs');
const path=require('path');
const cloudinary = require("cloudinary").v2;

exports.showPosts=async(req,res)=>{
    try{
        const posts=await db.Post.find({}).populate('user_info').populate({path:'comment_info',populate:{path:'user_info'}})
        res.status(200).json(posts);
    }catch(err){res.status(500).json({message:"server error"})}
}

exports.showOnePost=async(req,res)=>{
    try{
      let post= await db.Post.findOne({_id:req.query.id}).populate('user_info').populate({path:'comment_info',populate:{path:'user_info'}})
       res.status(200).json(post);
    }catch(err){res.status(500).json({message:"server error"})}
}


exports.profile=async(req,res)=>{
    try{
        
        let id=req.query.id;
        let post=await db.User.findOne({_id:id}).populate({path:'mypost',populate:{path:'user_info'}})
        res.status(200).json(post);
    }catch(err){res.status(500).json({message:"server error"})}
}


exports.addPost=async(req,res)=>{
 try{
     let date=new Date().toLocaleString();
    let addPost=await  db.Post({ title:req.body.title,content:req.body.content,imgname:req.files.blogImg[0].filename,imgurl:req.files.blogImg[0].path,user_info:[req.body.user_id],
    createdAt:date}).save();
    user=await db.User.updateOne({_id:req.body.user_id},{$push:{mypost:addPost._id}});
      res.status(200).json(addPost);
       }catch(err){res.status(500).json({message:"server error"})}
    }

exports.editPost=async(req,res)=>{
   try{
     let id=req.query.id
     let img=req.body.imgname;
     let imgpath=req.body.imgurl;

         req.files.blogImg?img=req.files.blogImg[0].filename:null;
         req.files.blogImg?imgpath=req.files.blogImg[0].path:null;
        req.files.blogImg?cloudinary.uploader.destroy(req.body.imgname,()=>{console.log("success")}):null;

    let editpost=await db.Post.updateOne({_id:id},{$set:{title:req.body.title,content:req.body.content,imgurl:imgpath,imgname:img}})
     console.log(editpost)
    res.status(200).json({info:id})
   }catch(err){res.status(500).json({message:"server error"})}
} 


exports.getcomment=async(req,res)=>{
    try{
        let id=req.query.id;
        let comment=await db.Post.findOne({_id:id},{_id:0,comment_info:1}).populate('comment_info');
        res.status(200).send(comment)
    }catch(err){res.status(500).json({message:"server error"})}
}





exports.addComment=async(req,res)=>{
    try{
        let id=req.query.id;
        let date=new Date().toLocaleString();
        let newComment=await db.Comment({avatar:req.body.avatar,username:req.body.username,commentContent:req.body.comment,createdAt:date,post_info:id}).save();
         user=await db.Post.updateOne({_id:id},{$push:{comment_info:newComment._id}});
         res.status(200).json({info:newComment}); 
    }catch(err){res.status(500).json({message:"server error"})}
}



exports.deleteComment=async(req,res)=>{
    try{
        let id=req.query.id;
        console.log("id");
        let del= await db.Comment.findOneAndDelete({_id:id});
        let commDel=await db.Post.updateOne({comment_info:{$in:[id]}},{$pull:{comment_info:id}});
       res.status(200).json({info:"comment deleted"});
    }catch(err){res.status(500).json({message:"server error"})}
}




exports.deletePost=async(req,res)=>{
    try{
        let id=req.query.id;
        let imgid=req.query.imgid;
         cloudinary.uploader.destroy(imgid,()=>{console.log("deleted")});
        let del= await db.Post.findOneAndDelete({_id:id});
        let commDel=await db.Comment.deleteMany({post_info:id});
       res.status(200).json({info:"post deleted"});
    }catch(err){res.status(500).json({message:"server error"})}
}

exports.likes=async(req,res)=>{
    try{
       console.log(req.query);
       let like=await db.Post.exists({$and:[{_id:req.query.postid},{likes:{$in:[req.query.userid]}}]});
       if(like===true){
          like=await db.Post.updateOne({_id:req.query.postid},{$pull:{likes:req.query.userid}})
            return res.status(200).send("okay");
       }
       else{
           like=await db.Post.updateOne({_id:req.query.postid},{$push:{likes:req.query.userid}})
            return res.status(200).send("okay");
       }
        
    }catch(err){res.status(500).json({message:"server error"})}
}


