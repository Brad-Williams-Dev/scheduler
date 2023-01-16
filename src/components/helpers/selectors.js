export function getAppointmentsForDay(state, day) {
  const filterDays = state.days.find((actualDay) => actualDay.name === day);
  if (!filterDays) {
    return [];
  }
  return filterDays.appointments.map((appID) => state.appointments[appID]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return (
    {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  );
}


export function getInterviewersForDay(state, day) {
  const filterInterviewers = state.days.find((interviewee) => interviewee.name === day);
  if (!filterInterviewers) {
    return [];
  }

  return filterInterviewers.interviewers.map((intID) => state.interviewers[intID]);
}