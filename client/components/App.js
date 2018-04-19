import React, { Component } from 'react';
import '../css/App.css';
import './XRoom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">RooMe: A Centralized Roommate App</h1>
        </header>
        <XRoom/>
      </div>
    );
  }
}

export default App;
