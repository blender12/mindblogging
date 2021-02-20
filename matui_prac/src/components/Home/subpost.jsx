import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import parse from 'html-react-parser';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

const useStyles=makeStyles((theme)=>({
     subpostitem:{
         margin:"2px 3px",
         padding:"5px 5px"
     },
     mainActions:{
        justifyContent:"flex-end",
      },
}))



function SUBPOST(props){
  const classes=useStyles();
  return(
   <>
        <Grid item xs={12} sm={2} md={3} className={classes.subgriditem}>
        <Card className={classes.subpostitem} raised={true}>
           <CardHeader title={<Typography  align="center" style={{fontSize:"20px"}}>{props.title}</Typography>} action={<Badge badgeContent={Array.isArray(props.likes)?props.likes.length:null} color="primary" ><MoreVertIcon  color={Array.isArray(props.likes)&&props.likes.length?"secondary":"primary"} /></Badge>} subheader={<div style={{margin:"5px 2px",textAlign:"center"}}><h6>{props.date}</h6><h6 style={{margin:"5px 2px",textAlign:"center"}}>{props.username}</h6></div>}/>
           <CardContent  style={{textAlign:"justify",lineHeight:"20px",fontFamily:"sans-serif",fontSize:"13.5px"}}>{parse(props.content.slice(0,300))}</CardContent>
           <CardActions className={classes.mainActions}><Link to={props.id}><Button variant="contained" color="primary" style={{ fontSize:"8px"}}>Show More</Button></Link></CardActions>
          </Card>
        </Grid>
   </>
  )
}

export default SUBPOST;