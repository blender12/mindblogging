import {ADD_POST} from '../types/postTypes';

let initialpost="";


const postReducer=(state=initialpost,action)=>{

    switch(action.type){
      
        case ADD_POST:return action.payload;
        default:return state;
    }
}



export default postReducer;


