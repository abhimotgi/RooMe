import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';

class ToDoList extends Component {
  // let state = {items: []};

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getItems();
    // console.log('printing this', this);
  }

  render() {
    var items = this.props.items.map(function (item, index) {
      return <h3 key={index}>{item.description}</h3>;
    });
    return (
      <div>
        <h1> To Do List </h1>
        {items}
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getItems : () => dispatch(getItems())
  }
};

const mapStateToProps = (state) => {
  return {
    items: state.items
  }

  // return state;

}
export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);