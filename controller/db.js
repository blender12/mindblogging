const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    username:String,email:String,avatar:String,mypost:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'post'/*--Schema name---*/
    }],createdAt:String
});

const user=mongoose.model('user',userSchema);

exports.User=user;

const commentSchema=new Schema({
    avatar:String,
    username:String,
    commentContent:String,
    createdAt:String,
    post_info:String,
});

const comment=mongoose.model('comment',commentSchema);
exports.Comment=comment


const postSchema=new Schema({
    title:String,
    content:String,
    imgurl:String,
    imgname:String,
    user_info:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'/*---schemaName---*/
    }],
    comment_info:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }],
    likes:Array,
    createdAt:String
})

const post=mongoose.model('post',postSchema);
exports.Post=post;