/**
 * @fileoverview <ExpandTrigger /> receives user clicks/taps to trigger
 * to display of the entire <BottomControls /> component. 
 */
import React from 'react';

const ExpandTrigger = ({expanded, onClick}) => (
  <div className={`expand-trigger ${expanded ? '-expanded' : ''}`}>
    <button className="-button" onClick={onClick}>
      V
    </button>
  </div>
);

export default ExpandTrigger;