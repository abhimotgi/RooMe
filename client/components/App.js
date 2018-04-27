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
        <RoomHeader />
        <div className='container'>
          <div className='row'>
            <div className='col-sm'>
              <ItemList />
            </div>
            <div className='col-sm'>
              <AddItemBox />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class RoomHeader extends Component {
  constructor() {
    super();
    this.state = {
      roomName: ''
    };
    // this.setState({roomName: ''});
    // this.state.roomName = '';
  }

  componentDidMount() {
    fetch('/api/getRoomInfo', {
      credentials: 'include',
      headers: {'auth-token': localStorage.getItem('token')}
    })
    .then(res => {
      // console.log('RES', res);
      return res.json();
    })
    .then(resp => {
      // console.log('resp', resp);
      console.log('RESP', resp);
      this.setState({roomName: resp.roomName});
    });
  }

  render() {
      return(<div className='page-header'>
        <h1>{this.state.roomName}</h1>
      </div>);    
  }
}

class ItemList extends Component {
  constructor() {
    super();
    this.state = { items : [] };
    addedItem = addedItem.bind(this);
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
        return <Item key={index} completed={item.completed} author={item.author} itemId={item._id} description={item.description}/>;
      });
    }
    

    return (
      <div>
      <h2>List of Items</h2>
        <ul className='list-group'>
          {items}
        </ul>
      </div>
    );
  }
}

function addedItem(item) {
  var newItems = this.state.items;
  newItems.push(item);
  this.setState({items: newItems});
}

class AddItemBox extends Component {
  constructor() {
    super();
    this.addItem = this.addItem.bind(this);
  }

  addItem(event) {
    event.preventDefault();
    fetch('/api/addItem',
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        'content': event.target.content.value
      }),
      headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
      }
    })
    .then(res => {
      return res.json();
    })
    .then(resp => {
      addedItem(resp);
    })
    .then(event.target.reset());

  }

  render() {
    return (
      <div>
        <h2>Add an Item</h2>
        <form onSubmit={this.addItem}>
          <p>Description</p>
          <textarea name='content'/>
          <br/>
          <input type='submit'/>
        </form>
      </div>
    );
   }
}

class Item extends Component {

  constructor() {
    super();
    this.toggleItem = this.toggleItem.bind(this);
    this.importantItem = this.importantItem.bind(this);
    // this.state.completed = this.props.completed;
    // var c = this.props.completed;
    this.state = {
      completed: 0,
      important: 0
    };
  }

  componentDidMount() {
    this.setState({completed: this.props.completed});
    // this.setState({important: this.props.important});
  }

  importantItem(event) {
    fetch('/api/importantItem/' + this.props.itemId,
    {
      method: 'POST', 
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    .then(res => {
      return res.json();
    })
    .then(resp => {
      this.setState({ important : resp.important });
    });
  }

  toggleItem(event) {
    fetch('/api/toggleItem/' + this.props.itemId,
    {
      method: 'POST', 
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    .then(res => {
      return res.json();
    })
    .then(resp => {
      this.setState({ completed: resp.completed });
    });
  }

  



  render () {
    var item;
    if (this.state.completed === 0) {
      item =  <a style={{cursor: 'pointer'}} onClick={this.toggleItem}>{this.props.description}</a>;
    } else {
      item =  <a style={{cursor: 'pointer', textDecorationLine: 'line-through'}} onClick={this.toggleItem}>{this.props.description}</a>
    }

    var important = '';
    if (this.state.important === 1) {
      important = '★★★';
    }

    return (
      <div className='Item'>
        <li className='list-group-item'>
          {item} {important}
          <br/>
          <i>created by {this.props.author}</i>
          <br/>
          <i><a stype={{cursor: 'pointer'}} onClick={this.importantItem}>mark as important</a></i>
        </li>
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
    fetch('/api/loginRoom', 
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
      })
      .catch((err) => {
        alert(err);
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
