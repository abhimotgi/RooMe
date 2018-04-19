import React from 'react';

class XRoom extends React.Component {
  // state = {rooms: []};

  constructor() {
    super();
  }



  componentDidMount() {
    fetch('/getRooms')
      .then(res => res.json())
      .then(rooms => this.setState({rooms}));
  }

  render() {
    var rooms = this.state.rooms.map(function (room) {
      return <li>room.roomName</li>;
    });
    return (
      <div>
        <ul>
          {rooms}
        </ul>
      </div>
    );
  }

}

export default XRoom;