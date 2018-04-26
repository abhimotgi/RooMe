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
        <Route exact path="/" component={Rooms} />


        // <Switch>
          // <Route path='/rooms' component={XRoom}/>
          // <Route path='/items' component={ToDoList}/>
          // <Route component={XRoom}/>
        // </Switch>

      </div>
    );
  }
}


class Room extends Component {
  render () {
    return (
      <div className="Room">
        <h3>{this.props.roomName}</h3>
      </div>
    );
  }
}

export default App;
