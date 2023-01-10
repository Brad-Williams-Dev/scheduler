import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {

  const day = props.days.map((days) => {
    return (
      <DayListItem
        key={days.id}
        name={days.name}
        spots={days.spots}
        selected={days.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return (
    <>
      {day}
    </>
  );
};

export default DayList;