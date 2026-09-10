import "./style.css";
import { setState, subscribe } from "./store.js";
import { renderRoute, initRouter } from "./router.js";

// setState({
//   habits: [],
// });

subscribe(() => {
  renderRoute();
});

initRouter();

