const db=require('./db.js');
const mail=require('./mailer.js');
const jwt=require('jsonwebtoken');

exports.signin=async(req,res)=>{
     const{email,name,imageUrl}=req.body.userData;
   try{
    let user=await db.User.findOne({email:email});
    if(!user){
      let date=new Date().toLocaleString();
      user=await db.User({username:name,email:email,avatar:imageUrl,mypost:[],createdAt:date}).save();
      let token=jwt.sign({email:user.email,id:user._id},process.env.secret_jwt,{expiresIn:"1h"})
      let refToken=jwt.sign({email:user.email,id:user._id},process.env.secret_jwt,{expiresIn:"1d"})
      let auth=true;
      mail.reg_mail(user.email);
      return res.status(200).json({token,refToken,user,auth});
    }

      let token=jwt.sign({email:user.email,id:user._id},process.env.secret_jwt,{expiresIn:"1h"})
      let refToken=jwt.sign({email:user.email,id:user._id},process.env.secret_jwt,{expiresIn:"1d"})
      let auth=true;
      return res.status(200).json({token,refToken,user,auth});


   }catch(err){console.log(err)}
}

exports.refreshToken=async(req,res)=>{
  try{
    if(req.headers.authorization){
      const refToken=req.headers.authorization.split(" ")[1];
       jwt.verify(refToken,process.env.secret_jwt);
       let token=jwt.sign({email:req.body.email,id:req.body._id},process.env.secret_jwt,{expiresIn:"1h"});
       let user=req.body;
       console.log(user);
       let auth="changed"
        return res.status(200).json({token,refToken,user,auth});
    }
  }catch(err){
       err.message==='jwt expired'?res.status(401).send('jwt refreshtoken expired'):res.status(403).send('forbidden route')
  }
}

exports.logOut=async(req,res)=>{
    try{
        req.session.destroy();
        res.status(200).json({info:"logOut"});
    }catch(err){res.status(500).send("server error")}
}