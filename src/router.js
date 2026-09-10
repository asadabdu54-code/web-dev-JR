const routes = {
  "#/habits": () => import("./views/habits.js"),
  "#/timer": () => import("./views/timer.js"),
  "#/board": () => import("./views/board.js"),
};

export async function renderRoute() {
  const hash = location.hash || "#/habits";
  const loadView = routes[hash] ?? routes["#/habits"];
  const module = await loadView();
  const app = document.getElementById("app");
  app.innerHTML = ""; // clear previous view
  module.render(app);
}

export function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  renderRoute(); // handle initial load
}
