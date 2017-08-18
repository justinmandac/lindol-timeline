import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import Drawer from 'material-ui/Drawer';

export const drawerStyle = {
  top: '64px',
  position: 'absolute',
};

export default class EqDrawer extends Component {
  render() {
    return (
      <Drawer containerStyle={drawerStyle} openSecondary={true} zDepth={1} >
        <DatePicker hintText="Start Date" />
        <DatePicker hintText="End Date" />
      </Drawer>
    );
  }
}