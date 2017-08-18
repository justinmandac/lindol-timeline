import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

export const drawerStyle = {
  top: '64px',
  position: 'absolute',
};

export default class EqDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: new Date(),
      end: new Date(),
    };
  }
  handleClick() {
    this.props.handleDateClick(this.state);
  }

  setDate(dateType,b,value) {
    this.setState((prevState, props) => {
      const data = {};
      data[dateType] = value;
      const state = Object.assign({}, prevState, data);
      console.log(state);
      return state;
    });
  }

  render() {
    return (
      <Drawer containerStyle={drawerStyle} openSecondary={true} zDepth={1} >
        <DatePicker onChange={this.setDate.bind(this, 'start')} hintText="Start Date" autoOk={true} />
        <DatePicker onChange={this.setDate.bind(this, 'end')} hintText="End Date" autoOk={true} />
        <RaisedButton label="Filter" onClick={this.handleClick.bind(this)}/>
      </Drawer>
    );
  }
}