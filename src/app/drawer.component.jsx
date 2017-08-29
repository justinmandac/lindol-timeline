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
      const time = value.getTime();

      data[dateType] = value;

      if (dateType === 'start' &&
          time > prevState.end.getTime()) {
        return prevState;
      }

      if (dateType === 'end' &&
          time > (new Date()).getTime()) {
        return prevState;
      }

      const state = Object.assign({}, prevState, data);

      return state;
    });
  }

  render() {
    const {start, end} = this.state;
    return (
      <Drawer open={this.props.open} zDepth={1} >
        <h2 className="drawer__header">{this.props.title}</h2>
        <DatePicker value={start} onChange={this.setDate.bind(this, 'start')} hintText="Start Date" autoOk={true} />
        <DatePicker value={end} onChange={this.setDate.bind(this, 'end')} hintText="End Date" autoOk={true} />
        <RaisedButton label="Filter" onClick={this.handleClick.bind(this)}/>
      </Drawer>
    );
  }
}