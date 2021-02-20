import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {SignIn_action,addData_action} from '../actions/user_action';
import { Link,useLocation,useHistory} from 'react-router-dom';
import { IconButton,AppBar,Toolbar,makeStyles,Avatar,Typography,Button,Menu, MenuItem,Drawer,List,ListItem} from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import '../navbar.css';
import { GoogleLogin } from 'react-google-login';





const useStyles=makeStyles((theme)=>({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navMenuItems:{
    marginLeft:theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  title: {
    justifyContent:"space-between",
  },
  
  button:{
    backgroundColor:"transparent",
    textTransform:"Capitalize",
    color:"white",
    "&:hover":{
      backgroundColor:"transparent"
    }
  },
  Drawer:{
    display:"none",
    
  },
  [theme.breakpoints.down('md')]:{
    Drawer:{
      display:"flex",

    },
    Drawer_paper:{
      width:"180px",
    },
    Menu:{
      display:"none"
    }
  },
}))


function NavBar() {
  
  const dispatch=useDispatch();
  const location = useLocation();
  const history=useHistory();

  const userinfo=useSelector(state=>state.user);

const googleSuccess=async(res)=>{
  try{
    let data=await res;
  let result=data.profileObj;
  console.log(result);
  dispatch(SignIn_action(result,history));
  }catch(err){console.log(err)}
}

const googleFailure=()=>{
  history.push('/');
}

const logout=()=>{
  localStorage.clear("profile");
  window.open("http://localhost:3000/", "_self");
}

useEffect(()=>{
 dispatch(addData_action(JSON.parse(localStorage.getItem("profile"))))
 
},[location]);

  const classes=useStyles();
  const[anchorEL,setAnchorEL]=useState(null);
  const[drawer,setDrawer]=useState(false);
  const show=(e)=>{
    setAnchorEL(e.currentTarget);
    setDrawer(true);
  }
  const Hide=()=>{
    setAnchorEL(null);
    setDrawer(false);
  }



 return(
   <AppBar component='nav'>
    <Toolbar  className={classes.title}>
    <Link to="/"> <Button className={classes.button} disableRipple={true}> <Typography variant="h5" className={classes.menuButton}>MindbloGGing</Typography></Button></Link>
    <div className="navMenu">
     {userinfo!==null?<IconButton onClick={show} className={classes.navMenuItems} disableRipple={true} color="secondary"><Avatar alt="avatar" src={userinfo==null?null:userinfo?.user?.avatar}></Avatar></IconButton>
     :<GoogleLogin 
    render={renderProps => (
      <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.button}>Login</Button>
    )}
        clientId={process.env.REACT_APP_clientID}
        buttonText="Login"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
      />
}
       <Menu anchorEl={anchorEL} className={classes.Menu} open={Boolean(anchorEL)} onBackdropClick={Hide} variant="selectedMenu" getContentAnchorEl={null} anchorOrigin={{vertical:40,horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 40,}}>
       <Link to="/profile"><MenuItem><PersonOutlineOutlinedIcon style={{marginRight:"5px"}} /><Typography variant="subtitle1"> Profile</Typography></MenuItem></Link>
       <Link to="/newpost"><MenuItem><CreateOutlinedIcon style={{marginRight:"5px"}} /><Typography variant="subtitle1">New Post</Typography></MenuItem></Link>
       <MenuItem onClick={logout}><ExitToAppOutlinedIcon style={{marginRight:"5px"}}/><Typography variant="subtitle1"> Logout</Typography></MenuItem>
      </Menu>
      <Drawer classes={{paper:classes.Drawer_paper}} variant="temporary" open={drawer} onBackdropClick={Hide} anchor="right" className={classes.Drawer}>
      <div style={{width:"auto"}} role="presentation">
      <IconButton edge="end" onClick={Hide}><ClearOutlinedIcon/></IconButton>
        <List>
            <Link to="/profile"><ListItem alignItems="center"><PersonOutlineOutlinedIcon style={{marginRight:"5px"}} /><Typography variant="subtitle1">profile</Typography></ListItem></Link>
            <Link to="/newpost"> <ListItem alignItems="center"><CreateOutlinedIcon style={{marginRight:"5px"}}/><Typography variant="subtitle1">New Post</Typography></ListItem></Link>
            <ListItem onClick={logout} alignItems="center"><ExitToAppOutlinedIcon style={{marginRight:"5px"}} /><Typography variant="subtitle1">Logout</Typography></ListItem>
        </List>
         </div>
      </Drawer>
    </div>
    </Toolbar>
   </AppBar>
 )
}

export default NavBar;
