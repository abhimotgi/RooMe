import React, { Component } from 'react';
import NavBar from './NavBar';
import {
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

import { withRouter } from 'react-router';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container-fluid'>
        <NavBar />
        <Switch>
          <Route path='/items' component={ItemPage} />
          <Route exact path='/' component={RoomPage} />
        </Switch>
      </div>
    );
  }
}

class RoomPage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm'>
            <RoomList />
          </div>
          <div className='col-sm'>
            <CreateRoom />
          </div>
          <div className='col-sm'>
            <LoginRoom />
          </div>
        </div>
      </div>
    );
  }
}

class ItemPage extends Component {
  render() {
    return (
      <div>
        <h1>List of Items</h1>
        <ItemList />
      </div>
    );
  }
}

class ItemList extends Component {
  constructor() {
    super();
    this.state = { items : [] };
  }

  componentDidMount() {
    fetch('/api/getItems', { credentials: 'include', headers: {'auth-token': localStorage.getItem('token')} })
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        this.setState({items: resJson});
      });
  }

  render() {
    var items;
    if (this.state.items) {
      items = this.state.items.map(function(item, index) {
        return <Item key={index} description={item.description}/>;
      });
    }
    

    return (
      <div>
        {items}
      </div>
    );
  }
}

class Item extends Component {
  render () {
    return (
      <div className="Item">
        <p>{this.props.description}</p>
      </div>
    );
  }
}

class Room extends Component {
  render () {
    return (
      <div className="Room">
        <p>{this.props.roomName}</p>
      </div>
    );
  }
}

class RoomList extends Component {
  constructor() {
    super();
    this.state = { rooms: [] };  
  }

  componentDidMount() {
    fetch('/api/getRooms', {credentials: 'include'})
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        this.setState({rooms: resJson});
      });
  }

  render () {
    var rooms;
    if (this.state.rooms) {
      rooms = this.state.rooms.map(function(room, index) {
        return <Room key={index} roomName={room.roomName}/>;
      });
    }
    
    return (
      <div>
        <h1>List of Rooms</h1>
        {rooms}
      </div>
    );
  }
}

class CreateRoom extends Component {
  constructor() {
    super();
    this.createRoom = this.createRoom.bind(this);
    this.state = {loggedIn: false};
  }

  createRoom(event) {
    var bigThis = this;
    event.preventDefault();
    fetch('/api/createRoom', 
      {
        method: 'POST', 
        credentials: 'include', 
        body: JSON.stringify({
          'roomName': event.target.roomName.value, 
          'roomPassword': event.target.roomPassword.value, 
          'nickname': event.target.nickname.value
        }), 
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(resp => {
        localStorage.setItem('token', resp.token);
      })
      .then(() => {
        if (localStorage.token !== 'undefined') {
          this.setState({ loggedIn : true });
        }
      });

  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/items'/>
    } else {
      return (
        <div>
          <h1>Create a Room</h1>
          <form onSubmit={this.createRoom}>
            <p>Room Name</p>
            <input type='text' name='roomName'/>
            <p>Room Password</p>
            <input type='password' name='roomPassword'/>
            <p>Nickname</p>
            <input type='text' name='nickname'/>
            <br/>
            <input type='submit'/>
          </form>
        </div>
      );
    }
  }
}

class LoginRoom extends Component {

  // state = {
  //   loggedIn: false
  // }

  constructor () {
    super();
    this.login = this.login.bind(this);
    this.state = {loggedIn: false};
  }

  login(event) {
    // const { history } = this.props;
    // const { location } = this.props;
    event.preventDefault();
    fetch('/api/joinRoom', 
      {
        method: 'POST', 
        credentials: 'include', 
        body: JSON.stringify({
          'roomName': event.target.roomName.value, 
          'roomPassword': event.target.roomPassword.value, 
          'nickname': event.target.nickname.value
        }), 
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(resp => {
        localStorage.setItem('token', resp.token);
        // event.target.reset();
      })
      .then(() => {
        if (localStorage.token !== 'undefined') {
          this.setState({ loggedIn : true });
        }
      });
      
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/items'/>
    } else {
        return (
          <div>
            <h1>Login to a Room</h1>
            <form onSubmit={this.login}>
              <p>Room Name</p>
              <input type='text' name='roomName'/>
              <p>Room Password</p>
              <input type='password' name='roomPassword'/>
              <p>Nickname</p>
              <input type='text' name='nickname'/>
              <br/>
              <input type='submit'/>
            </form>
          </div>
        );
    }
  }
}


export default App;
