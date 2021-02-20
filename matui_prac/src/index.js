import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home.js';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Profile from './pages/profile.js';
import Posts from './pages/Post.js';
import Write from './pages/newPost.js';
import Edit from './pages/EditPost.js';
import Error403 from './pages/error403';
import {Provider} from 'react-redux';

import Store from './store';


ReactDOM.render(
   <Provider store={Store}>
      <BrowserRouter>
    <Switch>
    <Route exact path="/editpost/:id" component={Edit}/>
    <Route exact path="/newpost" component={Write}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/profile/" component={Profile}/>
      <Route exact path="/post/:id" component={Posts}/>
      <Route exact path="/error403" component={Error403}/>
    </Switch>
    </BrowserRouter>
   </Provider>,
 
  document.getElementById('root')
);


