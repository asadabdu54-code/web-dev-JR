import { getState, setState } from "../store.js";

export function render(container) {
  const state = getState();
  const cards = state.cards;

  const todo = cards.filter((card) => card.column === "todo");
  const doing = cards.filter((card) => card.column === "doing");
  const done = cards.filter((card) => card.column === "done");

  const todoCards = todo.map(function (card) {
    return `<div class="card" draggable="true" data-id="${card.id}"> <span>${card.title}</span>
    <button class="delete-card-btn" data-id="${card.id}"> <i class="fa-solid fa-trash"></i></button></div>`;
  });
  const doingCards = doing.map(function (card) {
    return `<div class="card" draggable="true" data-id="${card.id}"> <span>${card.title}</span>
    <button class="delete-card-btn" data-id="${card.id}"> <i class="fa-solid fa-trash"></i></button></div>`;
  });
  const doneCards = done.map(function (card) {
    return `<div class="card" draggable="true" data-id="${card.id}"> <span>${card.title}</span>
    <button class="delete-card-btn" data-id="${card.id}"> <i class="fa-solid fa-trash"></i></button></div>`;
  });

  container.innerHTML = `
    <div class="board">
      <div class="column">
        <h2>To Do</h2>
        <div class="card-list">${todoCards.join("")}</div>
        <input class="new-card-input" data-column="todo" placeholder="Add a card..." />
        <button class="add-card-btn" data-column="todo">Add</button>
      </div>
      <div class="column">
        <h2>Doing</h2>
        <div class="card-list">${doingCards.join("")}</div>
        <input class="new-card-input" data-column="doing" placeholder="Add a card..." />
        <button class="add-card-btn" data-column="doing">Add</button>
      </div>
      <div class="column">
        <h2>Done</h2>
        <div class="card-list">${doneCards.join("")}</div>
        <input class="new-card-input" data-column="done" placeholder="Add a card..." />
        <button class="add-card-btn" data-column="done">Add</button>
      </div>
    </div>
  `;

  const cardElements = container.querySelectorAll(".card");

  cardElements.forEach(function (card) {
    card.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", card.dataset.id);
    });
  });

  const cardLists = container.querySelectorAll(".card-list");

  cardLists.forEach(function (cardList) {
    cardList.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    cardList.addEventListener("drop", function (e) {
      e.preventDefault();

      const droppedCardId = e.dataTransfer.getData("text/plain");
      const targetColumn = cardList.dataset.column;

      const currentState = getState();

      const updatedCards = currentState.cards.map(function (card) {
        if (card.id === droppedCardId) {
          return { ...card, column: targetColumn };
        }
        return card;
      });

      setState({ cards: updatedCards });
    });
  });

  const deleteButtons = container.querySelectorAll(".delete-card-btn");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const cardId = button.dataset.id;
      const currentState = getState();

      const updatedCards = currentState.cards.filter(function (card) {
        return card.id !== cardId;
      });

      setState({ cards: updatedCards });
    });
  });

  function addCard(column) {
    const input = container.querySelector(
      `.new-card-input[data-column="${column}"]`,
    );
    const title = input.value.trim();

    if (title === "") return;

    const currentState = getState();
    const newCard = { id: crypto.randomUUID(), title: title, column: column };
    const newCards = [...currentState.cards, newCard];

    setState({ cards: newCards });
  }

  const addButtons = container.querySelectorAll(".add-card-btn");
  addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      addCard(button.dataset.column);
    });
  });

  const cardInputs = container.querySelectorAll(".new-card-input");
  cardInputs.forEach(function (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        addCard(input.dataset.column);
      }
    });
  });
}
