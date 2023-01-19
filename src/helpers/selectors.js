export function getAppointmentsForDay(state, day) {
  //Finds the days property of the state to find the day object that matches the value of the day parameter
  const filterDays = state.days.find((actualDay) => actualDay.name === day);
  //If not nothingis found, returns an empty array
  if (!filterDays) {
    return [];
  }
  // Maps the appointments property of the above found day object and returns a new array
  return filterDays.appointments.map((appID) => state.appointments[appID]);
}

export function getInterview(state, interview) {
  // checks if the interview paramater is falsy, if so, returns null
  if (!interview) {
    return null;
  }
  //Otherwise if truthy, returns an object.
  return (
    {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  );
}


export function getInterviewersForDay(state, day) {
  //Finds the days property of the state to find the day object that matches the value of the day parameter
  const filterInterviewers = state.days.find((interviewee) => interviewee.name === day);
  //if nothing is found, returns an empty array
  if (!filterInterviewers) {
    return [];
  }
  // Maps the interviewers property of the above found day object and returns a new array
  return filterInterviewers.interviewers.map((intID) => state.interviewers[intID]);
}