const nodemailer=require('nodemailer');
const {google}=require('googleapis');
const Oauth2=google.auth.OAuth2;

exports.reg_mail=function(mail_id){
    const Oauth2Client=new Oauth2(
        process.env.key1,
        process.env.key2,
        "https://developers.google.com/oauthplayground"
    );

    Oauth2Client.setCredentials({
        refresh_token:process.env.key3
    })
    
   const accesstoken=Oauth2Client.getAccessToken();

   const mailTransporter=nodemailer.createTransport({
      service:"gmail",
      auth:{
        type:"OAuth2",
        user:"cricketraid200@gmail.com",
        clientId:process.env.key1,
        clientSecret:process.env.key2,
        refreshToken:process.env.key3,
        accessToken:accesstoken
      }
   });

   const mailOptions={
       from:"cricketraid200@gmail.com",
       to:mail_id,
       subject:"welcome message",
       generateTextFromHTML:true,
       html:"<h1>Thanks for joining MindbloGGing!!</h1><p>Express yourself by writing some awesome blogs and compel others to say you are mindblogging Oops mindblowing ;)</p>"

   }

   mailTransporter.sendMail(mailOptions,(err)=>{
       if(err){return console.log("error in mail system")}
       console.log("mail sent");
   })
}

