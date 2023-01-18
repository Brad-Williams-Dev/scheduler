import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState(prev => ({ ...prev, day }));

  const updateSpots = function(state, appointments, day) {
    let count = 0;
    const dayObj = state.days.find(d => d.name === day);

    for (const id of dayObj.appointments) {
      const appt = appointments[id];

      if (appt.interview === null) {
        count++;
      }
    }
    dayObj.spots = count;
    return dayObj;
  };


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const dayObj = updateSpots(state, appointments, state.day);
        const newDaysArray = [...state.days];
        newDaysArray[dayObj.id - 1] = dayObj;

        setState({ ...state, appointments });
      });
  };


  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const dayObj = updateSpots(state, appointments, state.day);
        const newDaysArray = [...state.days];
        newDaysArray[dayObj.id - 1] = dayObj;

        setState({ ...state, appointments });
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return { setDay, bookInterview, cancelInterview, state };

};

export default useApplicationData;