import { getState, setState } from "../store.js";
let intervalId = null;

export function render(container) {
   const state = getState();
   const secondsRemaining = state.timer.secondsRemaining;

   const minutes = Math.floor(secondsRemaining / 60);
   const seconds = secondsRemaining % 60;

   container.innerHTML = `
   <div class="mode">
    <button id="work-btn">Work</button>
    <button id="break-btn">Break</button>
    </div>
    <h1>${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}</h1>
     <div class="button">
      <button id="start-btn">Start</button>
    <button id="pause-btn">Pause</button>
    <button id="reset-btn">Reset</button>
    </div>
  `;

   const startButton = container.querySelector("#start-btn");
   const pauseButton = container.querySelector("#pause-btn");
   const resetButton = container.querySelector("#reset-btn");
    const workBtn = container.querySelector("#work-btn");
    const breakBtn = container.querySelector("#break-btn");


   startButton.addEventListener("click", () => {
     if (intervalId === null) {
       intervalId = setInterval(() => {
         const currentState = getState();

         if (currentState.timer.secondsRemaining > 0) {
           setState({
             timer: {
               ...currentState.timer,
               secondsRemaining: currentState.timer.secondsRemaining - 1,
               isRunning: true,
             },
           });
         }
       }, 1000);
     }
   });

  pauseButton.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;

    const currentState = getState();

    setState({
      timer: {
        ...currentState.timer,
        isRunning: false,
      },
    });
  });


  resetButton.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;

    const currentState = getState();
    const resetSeconds = currentState.timer.mode === "work" ? 1500 : 300;

    setState({
      timer: {
        ...currentState.timer,
        secondsRemaining: resetSeconds,
        isRunning: false,
        mode: "work",
      },
    });
  });

  workBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;

    const currentState = getState();

    setState({
      timer: {
        ...currentState.timer,
        secondsRemaining: 1500,
        isRunning: false,
        mode: "work",
      },
    });
  });

  breakBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;

    const currentState = getState();

    setState({
      timer: {
        ...currentState.timer,
        secondsRemaining: 300,
        isRunning: false,
        mode: "break",
      },
    });
  });

}
