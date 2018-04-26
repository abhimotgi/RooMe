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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/rooms">
                    Rooms
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/items">
                    My Room
                  </Link>
                </li>
              </ul>
      </nav>
    );
  }
}

export default NavBar;