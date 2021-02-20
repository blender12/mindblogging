import React, {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import parse from 'html-react-parser';
import {makeStyles,Grid,Card,CardHeader,CardMedia,CardActions,Avatar,IconButton,Typography,Button,CardContent,TextField,Badge} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/Favorite';
import Comment from './PostComments.jsx';
import {setnewComment,getlikes,setLike} from '../../actions/post_action.js';
import {  WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon,  FacebookMessengerIcon,  FacebookShareButton,InstapaperIcon,  InstapaperShareButton, TwitterShareButton,  TwitterIcon, } from "react-share";



const useStyle=makeStyles((theme)=>({
    gridContner:{
   margin:"0 auto",
   marginTop:"72px",
    width:"90%",
    padding:"0 1rem"
    },
    card:{
        width:"100%",
        height:"auto",
    },

    cardMedia:{
        display:"block",
       margin:"1rem auto",
       width:"85%",
       height:"480px",
    },
    para:{
        lineHeight:"28px",
        textAlign:"justify",
        borderWidth:"thin",
        fontFamily:"sans-serif",
        margin:"16px 0",
        borderBottom:"1px solid grey"
    },
    add_comments:{
        display:"flex",
        justifyContent:"flex-start",
        margin:"16px 0"
    },
    CardActions:{
        justifyContent:"flex-end",
        marginRight:"12px",
    },
    socialLinks:{
        display:"flex",
        justifyContent:"flex-start",
        paddingLeft:"16px",
       },
    [theme.breakpoints.down('md')]:{
        cardMedia:{
            display:"block",
           margin:"1rem auto",
           width:"100%",
           height:"220px",
        },
        gridContner:{
            margin:"0 auto",
            marginTop:"72px",
             width:"100%",
             padding:"0 1rem"
             },
    },
}))

function Main(props){
    const dispatch=useDispatch();
    const userinfo=useSelector((state)=>state.user);
    const postinfo=useSelector(state=>state.post);
    const commentinfo=useSelector(state=>state.comment);
    const likeinfo=useSelector(state=>state.like);
    const mobileView=useSelector(state=>state.mobileView);
    const classes=useStyle();
    const [comment,setComment]=useState(null);
     const vanish=()=>{
        setComment("");
     }

     const upload=async(e)=>{
         e.preventDefault();
         let formdata= new FormData();
         formdata.append("comment",comment);
         formdata.append("avatar",userinfo.user.avatar);
         formdata.append("username",userinfo.user.username);
        try{
           dispatch(setnewComment(formdata,props.info._id));
           vanish();
        }catch(err){console.log(err)}
     }
    
  let z=commentinfo.reverse();

   useEffect(()=>{
       if(postinfo.likes){
          if(postinfo.likes.length<1){
          dispatch(getlikes([]));
          }
          else{
              dispatch(getlikes(postinfo.likes))
          }
       }
   },[postinfo])

   const addlike=(postid)=>{
        let userid=JSON.parse(localStorage.getItem("profile")).user._id;
        dispatch(setLike(userid,postid));
    }
    
    return(
        <Grid className={classes.gridContner}>
        <Grid item xs={12}>
         <Card className={classes.card}>
         <Typography align="center"  style={mobileView?{marginBottom:"12px",fontSize:"20px",fontFamily:"sans-serif"}:{fontFamily:"sans-serif",marginBottom:"12px",fontSize:"32px"}}>{props.info.title}</Typography>
         <CardMedia><img src={props.info.imgurl} alt="blog image" className={classes.cardMedia}/></CardMedia>
         
         <CardHeader  title={<Typography style={mobileView?{fontSize:"14px"}:{fontSize:"18px"}}>{props.info.user_info?props.info.user_info[0].username:null}</Typography>}
          subheader={<Typography  variant="caption">{props.info.createdAt}</Typography>} avatar={<Avatar src={props.info.user_info?props.info.user_info[0].avatar:null}/>} action={
            userinfo?<IconButton  aria-label="favourites" onClick={()=>{
                addlike(props.info._id);
            }}><Badge badgeContent={Array.isArray(likeinfo)?likeinfo.length:null} color="primary"><MoreVertIcon color={Array.isArray(likeinfo)&&likeinfo.length>0?"secondary":"primary"} /></Badge></IconButton>:<Badge badgeContent={Array.isArray(likeinfo)?likeinfo.length:null} color="primary" style={{marginRight:"8px"}}><MoreVertIcon color={Array.isArray(likeinfo)&&likeinfo.length>0?"secondary":"primary"} /></Badge>}/>
           
            <div className={classes.socialLinks}>
                <WhatsappShareButton  url={window.location.href} style={{marginLeft:"5px"}}><WhatsappIcon size={mobileView?22:24} round={true}/></WhatsappShareButton> 
                <TwitterShareButton  url={window.location.href} style={{marginLeft:"5px"}}><TwitterIcon  size={mobileView?22:24}round={true}/></TwitterShareButton>
                <FacebookShareButton  url={window.location.href} style={{marginLeft:"5px"}}><FacebookMessengerIcon size={mobileView?22:24} round={true}/></FacebookShareButton>
                <EmailShareButton  url={window.location.href} style={{marginLeft:"5px"}}><EmailIcon size={mobileView?22:24}round={true}/></EmailShareButton>
                <InstapaperShareButton  url={window.location.href} style={{marginLeft:"5px"}}><InstapaperIcon  size={mobileView?22:24} round={true}/></InstapaperShareButton>
            
            </div>
            {userinfo?<>
            <CardContent  className={classes.para}>{parse(''+props.info.content)}</CardContent>
            <form onSubmit={upload}>
            <CardContent style={{margin:"10px 2px"}}>
             <h4 style={{paddingLeft:'5px',fontFamily:"sans-serif"}}>{Array.isArray(commentinfo)?commentinfo.length+" "+"comments":null}</h4>
             <div className={classes.add_comments}>
              <Avatar style={{marginRight:"12px"}} src={props.info.user_info?props.info.user_info[0].avatar:null}/>
              <TextField style={{marginLeft:"12px"}} className="comms" fullWidth placeholder="add a comment" value={comment} onChange={(e)=>{
                  setComment(e.target.value);
              }} />
             </div>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <Button  color="primary" onClick={vanish}>Cancel</Button>
                <Button variant="contained" color="primary" type="submit">Add</Button>
            </CardActions>
            
            </form>
            </>:<><CardContent  className={classes.para}>{parse(''+props.info.content)}</CardContent><h4 style={{paddingLeft:'5px',fontFamily:"sans-serif"}}>{Array.isArray(commentinfo)?commentinfo.length+" "+"comments":null}</h4></>}
            <Grid container style={{margin:"10px 2px"}}>
             {Array.isArray(z)?z.map((cValue,index)=>{
                 return <Comment key={index} comment={cValue.commentContent} avatar={cValue.avatar} date={cValue.createdAt} user={cValue.username} id={cValue._id}/>
             }):null}
            </Grid>
         </Card>
        </Grid>
       </Grid>
    )
}

export default Main;