import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">roome</a>
      </nav>
    );
  }
}

export default NavBar;