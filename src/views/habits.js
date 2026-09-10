import { getState, setState } from "../store.js";

export function render(container) {
  const state = getState();
  const filter = state.habitFilter;

  // Filter the habits based on the active tab
  const filteredHabits = state.habits.filter((habit) => {
    if (filter === "active") return !habit.completed;
    if (filter === "completed") return habit.completed;
    return true; // "all"
  });

  const habitListItems = filteredHabits.map(function (habit) {
    return `<li>
            <input
                type="checkbox"
                class="habit-checkbox"
                data-id="${habit.id}"
                ${habit.completed ? "checked" : ""}
            >

            <span class="${habit.completed ? "completed" : ""}">${habit.name}</span>

            <button
                class="delete-btn"
                data-id="${habit.id}"
                aria-label="Delete ${habit.name}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        </li>`;
  });

  const remainingCount = state.habits.filter((h) => !h.completed).length;

  container.innerHTML = `
    <div class="habit-form">
      <input id="new-habit-input" placeholder="write your habits"/>
      <button id="add-btn">Add</button>
    </div>

    <div class="filter-tabs">
      <button class="filter-btn ${filter === "all" ? "active" : ""}" data-filter="all">All</button>
      <button class="filter-btn ${filter === "active" ? "active" : ""}" data-filter="active">Remaining</button>
      <button class="filter-btn ${filter === "completed" ? "active" : ""}" data-filter="completed">Completed</button>
    </div>

    <ul>
      ${habitListItems.join("")}
    </ul>

    <div class="habits-footer">
      <span>${remainingCount} remaining</span>
      <button class="clear-all-btn">Clear completed</button>
    </div>
  `;

  // ===== Add habit =====
  const input = container.querySelector("#new-habit-input");
  const addButton = container.querySelector("#add-btn");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addButton.click();
  }
});

  addButton.addEventListener("click", () => {
    const habitName = input.value.trim();
    if (!habitName) return;

    setState({
      habits: [
        ...getState().habits,
        {
          id: crypto.randomUUID(),
          name: habitName,
          completed: false,
        },
      ],
    });
  });

  // ===== Toggle completed =====
  const checkboxes = container.querySelectorAll(".habit-checkbox");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const habitId = checkbox.dataset.id;
      const completed = checkbox.checked;
      const currentState = getState();

      const updatedHabits = currentState.habits.map(function (habit) {
        if (habit.id === habitId) {
          return { ...habit, completed: completed };
        }
        return habit;
      });

      setState({ habits: updatedHabits });
    });
  });

  // ===== Delete habit =====
  const deleteButtons = container.querySelectorAll(".delete-btn");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const habitId = button.dataset.id;
      const currentState = getState();

      const updatedHabits = currentState.habits.filter(function (habit) {
        return habit.id !== habitId;
      });

      setState({ habits: updatedHabits });
    });
  });

  // ===== Filter tabs =====
  const filterButtons = container.querySelectorAll(".filter-btn");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setState({ habitFilter: button.dataset.filter });
    });
  });

  // ===== Clear completed =====
  const clearAllButton = container.querySelector(".clear-all-btn");
  clearAllButton.addEventListener("click", function () {
    const currentState = getState();
    const updatedHabits = currentState.habits.filter((h) => !h.completed);
    setState({ habits: updatedHabits });
  });
}
