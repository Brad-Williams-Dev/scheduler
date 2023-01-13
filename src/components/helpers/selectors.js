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