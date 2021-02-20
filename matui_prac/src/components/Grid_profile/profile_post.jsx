import React from 'react';
import {useHistory,Link} from 'react-router-dom';
import { Button,IconButton,Typography,Avatar,CardActions,CardContent,CardMedia,CardHeader,Card ,Grid,makeStyles} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {useSelector} from 'react-redux';
import parse from 'html-react-parser';
import * as api from '../../authapiCall';
const useStyles=makeStyles((theme)=>({
    cardItem:{
        margin:"10px auto",
        height:"300px",
        width:"80%",
        lineHeight:"22px",
        display:"flex",
    },

    Mediadiv:{
        width:"45%",
        height:"auto",
    },
    
    cardMedia:{
       Width:"100%",
       height:"100%",
    },

    cardInfo:{
        width:"55%",
        height:"auto",
    },
    cardContent:{
        textAlign:"justify",fontFamily:"sans-serif",height:"50%",overflow:"hidden",fontSize:"14.5px",marginLeft:"5px"
    },
    avatar:{
        width:"45px",
        height: "45px", 
    },
    mainActions:{
        justifyContent:"space-between",
        marginTop:"5px",
        padding:"0 5px",
      },
      [theme.breakpoints.down('md')]: {
        cardItem:{
            margin:"10px auto",
            width:"100%",
            height:"450px",
            fontSize:"14.5px",
            flexDirection:"column"
        },
        Mediadiv:{
            width:"100%",
            height:"50%",
        },
        cardInfo:{
            width:"100%",
            height:"50%",
            border:"1px solid green"
        },
        cardContent:{
            textAlign:"justify",fontFamily:"sans-serif",height:"38%",overflow:"hidden",fontSize:"12.5px"
        },
        cardMedia:{
            width:"100%",
            height:"100%",
         },
         avatar:{
            width:"30px",
            height: "30px", 
        },
        IconButton:{
            fontSize:"15px"
        }
      },
}))

function ProfileCard(props){
 const history=useHistory();
 const mobileView=useSelector(state=>state.mobileView);

  const del=async(id,img)=>{
      const data=await api.deletePost(id.slice(6,),img);
      console.log(data);
      history.push('/profile');
  }






    const classes=useStyles();
    
    return(
        <>
       
         <Grid item xs={12}>
          <Card className={classes.cardItem} raised={true}>
           <div className={classes.Mediadiv}>
           <CardMedia className={classes.cardMedia}>
               <img src={props.imgurl} alt="img" style={{width:"100%",height:"100%"}} />
           </CardMedia>
           </div>
           <div className={classes.cardInfo}>
            <CardHeader title={<Typography  style={mobileView?{fontSize:"14px",fontFamily:"sans-serif",fontWeight:"bold",height:"25px"}:{marginLeft:"12px",fontSize:"22px",fontFamily:"sans-serif",fontWeight:"bold",height:"28px",overflow:"hidden"}}>{props.title}</Typography>} avatar={<Avatar className={classes.avatar} src={props.avatar}/>} subheader={<div style={mobileView?{marginLeft:"2px"}:{marginLeft:"12px"}}><h5>{props.date}</h5><h5>{props.username}</h5></div>}/>
            <CardContent className={classes.cardContent}>{parse(" "+props.content.slice(0,220))}</CardContent>
             <CardActions className={classes.mainActions}>
                <div>
                   <IconButton><Link to={'/editpost/'+props.id.slice(6,)}><EditIcon className={classes.IconButton}></EditIcon></Link></IconButton>
                   <IconButton onClick={()=>{del(props.id,props.imgname)}}><DeleteIcon className={classes.IconButton}></DeleteIcon></IconButton>  
                </div>
               <Link to={props.id}><Button style={mobileView?{width:"100px",fontSize:"8px"}:{width:"120px",fontSize:"12px"}} color="primary" variant="contained">show more</Button></Link></CardActions>
           </div>
          </Card>
        </Grid>  
        </>
    )
}

export default ProfileCard;