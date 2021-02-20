import {LIKE_POST,ADD_LIKE} from '../types/postTypes';
let intiallike=[];

const PostLike=(state=intiallike,action)=>{
    switch(action.type){
        case LIKE_POST:return action.payload;
        case ADD_LIKE:{
            let check=state.some((cValue)=>cValue===action.payload);
            if(!check){return[...state,action.payload]}
            else{
               let newState= state.filter(cValue=>cValue!==action.payload);
               return newState;
            }
        }
        default:return state;
    }
}

export default PostLike;