import {createStore,applyMiddleware} from 'redux';
import RootReducer from './rootReducers.js'
import Thunk from 'redux-thunk';

const Store =createStore(RootReducer,applyMiddleware(Thunk));

export default Store;