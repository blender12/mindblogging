import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {delcomment} from '../../actions/post_action';


const useStyle=makeStyles((theme)=>({
    CommentSec:{
        display:"flex",
        alignItems:"center",
        margin:"16px 0"
    }
}));



function PostComment(props){
    const dispatch=useDispatch();
    const userinfo=useSelector((state)=>state.user);
const delComment=(id)=>{
    dispatch(delcomment(id));

}
 const classes=useStyle();
   return(
    <Grid item xs={12} className={classes.CommentSec}>
    <Avatar src={props.avatar} style={{marginLeft:"12px"}}/> 
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
    <div style={{marginLeft:"12px",marginTop:"12px",marginBottom:"12px",padding:"0 12px"}}>
     <h4 style={{paddingTop:"30px"}}>{props.user}</h4>
     <p style={{marginBottom:"30px"}}>{props.comment}</p>
     </div>
     {userinfo&&userinfo.user.username===props.user?<IconButton onClick={()=>{delComment(props.id)}}><DeleteIcon style={{fontSize:"16px"}}/></IconButton>:null}
    </div>
   </Grid>
   )
}

export default PostComment;



