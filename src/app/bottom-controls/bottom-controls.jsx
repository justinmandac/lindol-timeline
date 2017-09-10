import React from 'react';
import ExpandTrigger from './expand-trigger';

const BottomControls = () => (
  <div className="bottom-controls">
    <ExpandTrigger />
    <div className="-date-display">
      2017/04/22 - 2017/04/28
    </div>
    <div className="-events-container">
      <ul className="-events-list">

      </ul>
    </div>
  </div>
);

export default BottomControls;