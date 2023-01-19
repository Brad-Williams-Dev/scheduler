import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transition function => checks if the replace condition is true, if it is, sets mode state to the newMode param.
  // If its false, it updates the history state
  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
    } else {
      setHistory((prev) => {
        return [...prev, newMode];
      });
      setMode(newMode);
    }
  };

  //Back function => checks if the history array is greater than 1, if true, it sets the mode state 
  // with the second last item in the history array, then sets the history state.
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
};