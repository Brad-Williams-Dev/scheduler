import React from "react";
import 'components/InterviewerListItem.scss';
import classNames from "classnames";

const InterviewerListItem = props => {

  const interviewerClass = classNames("InterviewerListItem", {
    interviewers__item: props.id,
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected,
  });

  return (
    <li onClick={props.setInterviewer} className={interviewerClass} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;