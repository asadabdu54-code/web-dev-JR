let state = {
  habits: [],
  timer: {
    secondsRemaining: 1500,
    isRunning: false,
    mode: "work",
  },
  habitFilter: "all",
  cards: []
};

let listeners = [];

// Load saved state when the app starts
const savedState = localStorage.getItem("habit-state");

if (savedState) {
  state = {
    ...state,
    ...JSON.parse(savedState),
  };
}
export function getState() {
  return state;
}

export function setState(changes) {
  state = {
    ...state,
    ...changes,
  };

  // Save the latest state
  localStorage.setItem("habit-state", JSON.stringify(state));

  // Tell the app that state changed
  listeners.forEach(function (listener) {
    listener(changes);
  });
}

export function subscribe(listener) {
  listeners.push(listener);

  return function () {
    listeners = listeners.filter(function (fn) {
      return fn !== listener;
    });
  };
}
