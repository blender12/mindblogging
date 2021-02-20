import {ADD_POST,COMMENT_POST,ADD_COMMENT_POST,LIKE_POST,ADD_LIKE,DELETE_COMMENT} from '../types/postTypes';
import * as api from '../authapiCall.js';
import * as allapi from '../allapiCall.js';


export const setPost=(formdata)=>{
         return async function(dispatch){
               const data=await api.addPost(formdata);
               console.log(data.data);
               dispatch(addpost(data));
               window.open("https://mindblogging.herokuapp.com/", "_self");
         }

}


export const getPosts=()=>{
    return async function(dispatch){
        const{data}=await allapi.allPosts();
        dispatch(addpost(data));
    }
}

export const getProfile=(id)=>{
    return async function(dispatch){
        const data=await api.profile(id);
        const info=data.data;
        dispatch(addpost(info))
    }
}

export const getOnepost=(id)=>{
    return async function(dispatch){
        const data=await allapi.getPost(id);
        const info=data.data;
        dispatch(addpost(info));
    }
}

export const getComment=(id)=>{
  return async function(dispatch){
      let data=await api.getcomment(id);
        let info=data.data;
        dispatch(getcomment(info.comment_info));

  }
}

export const setnewComment=(formdata,id)=>{
    return async function(dispatch){
        const data=await api.commentPost(formdata,id);
            let info=[data.data.info]
            console.log(info);
            dispatch(addcomment(info));

    }
}

export const setLike=(userid,postid)=>{
    return async function(dispatch){
        const data=await api.likePost(userid,postid);
        console.log(data);
        dispatch(addlike(userid));
    }
}


export const addpost=(data=null)=>{
    if(data){
        return{
            type:ADD_POST,
            payload:data
        }
    }
    else{
        return{
            type:ADD_POST,
            payload:data
        }
    }
}



export const getcomment=(data=null)=>{
    if(data){
        return{
            type:COMMENT_POST,
            payload:data
        }
    }
    else{
        return{
            type:COMMENT_POST,
            payload:data
        }
    }
}








export const addcomment=(data=null)=>{
    if(data){
        return{
            type:ADD_COMMENT_POST,
            payload:data
        }
    }
    else{
        return{
            type:ADD_COMMENT_POST,
            payload:data
        }
    }
}

export const delcomment=(id)=>{
    return async function(dispatch){
        console.log("ok"+" "+id)
        await api.deletecomment(id);
        dispatch(removeComment(id))
    }
}

export const getlikes=(data)=>({
            type:LIKE_POST,
            payload:data,
    });
 


    export const addlike=(data=null)=>{
        if(data){
            return{
                type:ADD_LIKE,
                payload:data
            }
        }
        else{
            return{
                type:ADD_LIKE,
                payload:data
            }
        }
    }

    export const removeComment=(data=null)=>{
        if(data){
            return{
                type:DELETE_COMMENT,
                payload:data
            }
        }
        else{
            return{
                type:DELETE_COMMENT,
                payload:data
            }
        }
    }
    