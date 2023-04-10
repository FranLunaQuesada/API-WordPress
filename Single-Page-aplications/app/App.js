import { loader } from "./components/loader.js";
import { header } from "./components/header.js";
import { main } from "./components/main.js";
import { router } from "./components/router.js";
import { infiniteScroll } from "./helpers/infinite_scroll.js";

export function App() {
  const $root = document.getElementById("root");
  
  $root.innerHTML = null;
  $root.appendChild(header());
  $root.appendChild(main());
  $root.appendChild(loader());

  router();
  infiniteScroll();
}
