import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getRooms } from '../actions/roomActions';

class XRoom extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    console.log('THIS', this);
    // var rooms = this.props.rooms.map(function (room, index) {
    //   return <h3 key={index}>{room.description}</h3>;
    // });
    return (
      <div>
        <h1> To Do List </h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRooms: () => dispatch(getRooms())
  }
};

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  }

  // return state;
}
export default connect(mapStateToProps, mapDispatchToProps)(XRoom);