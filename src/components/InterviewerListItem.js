import React from "react";
import 'components/InterviewerListItem.scss';
import classNames from "classnames";

const InterviewerListItem = props => {

  const interviewerClass = classNames('interviewers__item ',
    {
      "interviewers__item--selected": props.selected
    });

  const isSelected = () => {
    if (props.selected === true) {
      return props.name;
    }
  };

  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {isSelected()}
    </li>
  );
};

export default InterviewerListItem;