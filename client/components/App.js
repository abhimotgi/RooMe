import React, { Component } from 'react';
// import '../css/App.css';
import XRoom from './XRoom';
import NavBar from './NavBar';
import ToDoList from './ToDoList';
import { createStore } from 'redux';
import {
  Route,
  Switch,
} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container-fluid'>
        <NavBar />
        <Switch>
          <Route path='/rooms' component={XRoom}/>
          <Route path='/items' component={ToDoList}/>
          <Route component={ToDoList}/>
        </Switch>

      </div>
    );
  }
}

export default App;
