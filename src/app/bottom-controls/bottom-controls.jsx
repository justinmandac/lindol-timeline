import React from 'react';
import ExpandTrigger from './expand-trigger';

const BottomControls = ({ expanded, onClick }) => (
  <div className={`bottom-controls ${expanded ? '-expanded' : ''}`}>
    <ExpandTrigger expanded={expanded} onClick={onClick}/>
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