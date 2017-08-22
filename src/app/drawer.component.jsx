import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

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

  setDate(dateType, b, value) {
    this.setState((prevState, props) => {
      const data = {};
      data[dateType] = value;

      if (dateType === 'start' &&
          value.getTime() > prevState['end'].getTime()) {
        return prevState;
      }

      if (dateType === 'end' &&
          value.getTime() > (new Date()).getTime()) {
        return prevState;
      }

      const state = Object.assign({}, prevState, data);

      return state;
    });
  }

  render() {
    const {start, end} = this.state;
    return (
      <Drawer zDepth={1} >
        <h2 className="drawer__header">PH Earthquakes</h2>
        <DatePicker value={start} container="inline" onChange={this.setDate.bind(this, 'start')} hintText="Start Date" autoOk={true} />
        <DatePicker value={end} container="inline" onChange={this.setDate.bind(this, 'end')} hintText="End Date" autoOk={true} />
        <RaisedButton label="Filter" onClick={this.handleClick.bind(this)}/>
      </Drawer>
    );
  }
}