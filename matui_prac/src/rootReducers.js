import {combineReducers} from 'redux';
import UserReducer from './reducers/userReducers';
import PostReducer from './reducers/postReducers';
import CommentReducer from './reducers/commentReducer';
import LikeReducer from "./reducers/likeReducer.js";
import MobViewReducer from './reducers/MobileReducers.js';

const rootReducers=combineReducers({
    user:UserReducer,
    post:PostReducer,
    comment:CommentReducer,
    like:LikeReducer,
    mobileView:MobViewReducer,
})
export default rootReducers;