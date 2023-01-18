import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';


export default function DayListItem(props) {

  const dayClass = classNames('day-list__item ',
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    });


  // Formats the props.spots to return special strings if spots are 1 or below.
  const formatSpots = () => {
    if (props.spots === 1) {
      return '1 spot remaining';
    } else if (props.spots === 0) {
      return 'no spots remaining';
    } else {
      return (props.spots + ' spots remaining');
    }
  };

  return (
    <li onClick={props.setDay} className={dayClass} selected={props.selected} data-testid="day">
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}