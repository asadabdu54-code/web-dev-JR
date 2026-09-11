import "./style.css";
import { subscribe } from "./store.js";
import { renderRoute } from "./router.js";
import { initRouter } from "./router.js";

const routeRelevantKeys = {
  "#/habits": ["habits", "habitFilter"],
  "#/timer": ["timer"],
  "#/board": ["cards"],
};

subscribe((changes) => {
  const currentHash = location.hash || "#/habits";
  const relevantKeys = routeRelevantKeys[currentHash] || [];
  const changedKeys = Object.keys(changes);

  const isRelevant = changedKeys.some((key) => relevantKeys.includes(key));

  if (isRelevant) {
    renderRoute();
  }
});

initRouter();
