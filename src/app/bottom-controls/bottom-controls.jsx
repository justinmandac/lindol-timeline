import React from 'react';
import ExpandTrigger from './expand-trigger';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const BottomControls = ({ 
    expanded,
    onClick,
    startDate,
    endDate,
    focusedInput,
    onDatesChange,
    onFocusChange}) => (
  <div className={`bottom-controls ${expanded ? '-expanded' : ''}`}>
    <ExpandTrigger expanded={expanded} onClick={onClick}/>
    <div className="-date-display">
      <DateRangePicker
            orientation="vertical"
            startDate={startDate}
            endDate={endDate}
            focusedInput={focusedInput}
            onDatesChange={onDatesChange}
            onFocusChange={onFocusChange}
      />
    </div>
    <div className="-events-container">
      <ul className="-events-list">

      </ul>
    </div>
  </div>
);

export default BottomControls;