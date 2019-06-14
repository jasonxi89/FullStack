import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./home"
import Add from "./adduser"
import Edit from "./edituser"
import {BrowserRouter, Route, Switch, Router, Link, withRouter} from 'react-router-dom';



const WithRouterAdd = withRouter(Add);
class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
      <div className="container">
        <Switch>
            <Route path="/add" component={WithRouterAdd} />
            <Route path="/users/:id" component={Edit} />
            <Route path="*" component={Home} />
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}


export default App;
