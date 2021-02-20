import {COMMENT_POST,ADD_COMMENT_POST,DELETE_COMMENT} from '../types/postTypes';
let intialcomment=[];

const commentReducer=(state=intialcomment,action)=>{
    switch(action.type){
        case COMMENT_POST:return[...action.payload];
        case ADD_COMMENT_POST:return[...state,...action.payload];
        case DELETE_COMMENT:{
            let comment=state.filter((cValue)=>cValue._id!==action.payload);
            return[...comment]
        }
        default:return state;
    }
}

export default commentReducer;