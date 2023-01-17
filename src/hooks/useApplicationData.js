import React, { useState, useEffect } from "react";
import { getAppointmentsForDay } from "components/helpers/selectors";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    //Create a new array, then creates a new object for each of the elements
    const days = [...state.days].map(day => (
      { ...day }
    ));
    // Filter the days array to find the day object that matches the state.day
    const spots = days.filter((day) => state.day === day.name)[0];
    // Checks if that appointment id does not have a interview scheduled and if so, 
    // subtracts 1 from the spots
    if (!state.appointments[id].interview) {
      spots.spots--;
    };


    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
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


    //Creates a copy of the state array 
    const days = [...state.days];

    // Filters it to only include days where the state.day is equal to name. Then it adds 1 to the spots.
    const spots = days.filter((day) => state.day === day.name)[0];
    spots.spots++;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
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