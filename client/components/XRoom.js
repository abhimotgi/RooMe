import React from 'react';

class XRoom extends React.Component {
  // state = {rooms: []};

  constructor(props) {
    super(props);
  }



  componentDidMount() {
  }

  render() {
    var rooms = this.state.rooms.map(function (room) {
      return <li>room.roomName</li>;
    });
    return (
      <div>
        <ul>
        </ul>
      </div>
    );
  }

}

export default XRoom;