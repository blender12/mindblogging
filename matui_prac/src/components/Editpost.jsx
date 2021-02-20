import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CardActions, CardContent,Fab,TextField,Button,Typography,Card,Grid,makeStyles} from '@material-ui/core';
import * as api from '../authapiCall';


const useStyle=makeStyles((theme)=>({
    gridContainer:{
   margin:"0 auto",
   display:"flex",
   justifyContent:"center",
   marginTop:"72px",
    width:"90%",
    padding:"0 1rem"
    },
    card:{
        width:"100%",
        height:"auto",
    },
    Textfield:{
        width:"55%",
        marginRight:"16px"
    },
    CardActions:{
        justifyContent:"flex-end",
        marginRight:"12px",
    },
    centerDiv:{
        width:"90%",
        margin:"20px auto"
    },
   

    [theme.breakpoints.down('md')]:{
        gridContainer:{
            width:"100%", 
            padding:"0" 
        },
        Textfield:{
            width:"100%",
            marginBottom:"16px",
            marginRight:"12px"
        },
    },

    centerDiv:{
        width:"100%",
        margin:"20px auto"
    },

}))


function Edit(props){
const history=useHistory(); 
const mobileView=useSelector(state=>state.mobileView);
const classes=useStyle();
const [title,setTitle]=useState(undefined);
const [article,setArticle]=useState(undefined);
const [img,setImage]=useState(undefined);
     const vanish=()=>{
        setTitle(props.info.title)
        setArticle(props.info.content)
        setImage(undefined)
     }

     const upload=async(e)=>{
        
           e.preventDefault();
           let formdata=new FormData();
            if(title===undefined){
                formdata.append("title",props.info.title)
            }
            if(title!==undefined){
                formdata.append("title",title) 
            }

            if(article===undefined){
                formdata.append("content",props.info.content)
            }
            if(article!==undefined){
                formdata.append("content",article) 
            }
           if(img!==undefined){
            formdata.append("blogImg",img,img.name);
           }
           formdata.append("imgdel",props.info.img);
           try{
             const data=await api.editPost(formdata,props.info._id);
             window.open("https://mindblogging.herokuapp.com/", "_self");

           }catch(err){
               console.log(err);
           }
           
    
     } 
     
     
    return(
      <Grid className={classes.gridContainer}>
       <Grid item xs={12} >
        <Card className={classes.card}>
        <CardContent>
        <Typography align="center"  style={mobileView?{fontSize:"32px",color:"black"}:{fontSize:"50px"}}>Edit Blog</Typography>
        <form onSubmit={upload}>
        <div className={classes.centerDiv}>
            <TextField id="title" className={classes.Textfield} value={title||title===""?title:props.info.title} variant="outlined" fullWidth onChange={(e)=>{
               setTitle(e.target.value);
            }} />
        <label htmlFor="upload-photo">
         <input type="file" style={{display:"none"}}  onChange={(e)=>{
             setImage(e.target.files[0]);
         }}  id="upload-photo"/>
         <Fab color="primary" size={mobileView?"small":"large"} component="span" aria-label="add" variant="extended"><AddIcon/><Typography style={{fontSize:"9px"}}>Upload Photo</Typography></Fab></label>
         </div>
        
     
        <div>
        <CKEditor
          
          editor={ ClassicEditor }
          config={{
              removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']
            }}
          data={article||article===""?article:props.info.content}
          onReady={ editor => {
             
              editor.editing.view.change(writer => {
                  writer.setStyle(
                    "height",
                    mobileView?"400px":"500px",
                    editor.editing.view.document.getRoot()
                  );
                });
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              setArticle(data);
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
      />
        </div>
        <CardActions className={classes.CardActions}>
               <Button  color="primary" onClick={vanish}>Cancel</Button>
               <Button variant="contained" color="primary" type="submit">Edit</Button>
           </CardActions>
        </form>
        </CardContent>
        </Card>
       </Grid>
      </Grid>
    )
}

export default Edit;