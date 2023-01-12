export function getAppointmentsForDay(state, day) {
  const filterDays = state.days.find((actualDay) => actualDay.name === day);
  if (!filterDays) {
    return [];
  }
  return filterDays.appointments.map((appID) => state.appointments[appID]);
}


getAppointmentsForDay(state, day);