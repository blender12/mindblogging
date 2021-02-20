const jwt=require('jsonwebtoken');

module.exports=async(req,res,next)=>{
     try{
            if(req.headers.authorization){
               const token=req.headers.authorization.split(" ")[1];
               let decodeData=jwt.verify(token,process.env.secret_jwt);
               console.log(decodeData);
               req.userid=decodeData.id;
               return next();
            }
           console.log("not authenticated");
           return res.status(403).send("user not authenticated")
        
     }catch(err){err.message==='jwt expired'?res.status(401).send('jwt token expired'):res.status(403).send('forbidden route')}
}