
import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';



const useStyles=makeStyles((theme)=>({
   root:{
       height:"500px",
       padding:"8px 16px 0 16px",
   },
   mediaMain:{
    width:"100%",
    height:"60%"
   },
   mainActions:{
     marginTop:"4px",
     justifyContent:"flex-end",
   },
   subheader:{
    marginLeft:"12px"
   },
   [theme.breakpoints.down('md')]:{
   root:{
     height:"400px",
   },
   mediaMain:{
    width:"100%",
    height:"45%"
   },
   subheader:{
    marginLeft:"2px"
   },
   }
}))




function MAINPOST(props){
  const mobileView=useSelector(state=>state.mobileView);
  const classes=useStyles();
  return(
    <Grid item sm={6} xs={12} style={{marginBottom:"2px",marginTop:"16px"}}>
     <Card className={classes.root} raised={mobileView}>
     <CardHeader  title={<Typography style={mobileView?{fontSize:"14px",color:"black",width:"100%",height:"25px",overflow:"hidden"}:{fontSize:"20px",marginLeft:"8px",height:"28px",width:"98%",overflow:"hidden"}}>{props.title}</Typography>}
     subheader={<div className={classes.subheader}><h5 style={{margin:"5px 2px"}}>{props.date}</h5><h5 style={{margin:"5px 2px",color:"black",fontWeight:"bold"}}>{props.username}</h5></div>} avatar={<Avatar src={props.avatar}/>} action={
     <Badge badgeContent={Array.isArray(props.likes)?props.likes.length:null} color="primary"><MoreVertIcon fontSize={mobileView?"small":"medium"} color={Array.isArray(props.likes)&&props.likes.length?"secondary":"primary"} /></Badge>}/>
     <CardMedia className={classes.mediaMain} image={props.imgurl}  title="blog_img" component="figure"/>
     <CardActions className={classes.mainActions}><Link to={props.id}><Button variant="contained" color="primary" style={mobileView?{width:"100px",fontSize:"8px"}:{width:"140px",fontSize:"13px"}}>Show More</Button></Link></CardActions>
    </Card>
    </Grid>
    
  )
}

export default MAINPOST;