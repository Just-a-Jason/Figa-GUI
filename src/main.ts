import Figa, { find } from "./Figa/Figa";
import { routes } from "./config";

// Main figa app entry 🍇
const main = () => {
  const root = find("#app") as HTMLElement;

  Figa.initRouter(root, routes, {
    animation: "fade",
    transition: 400,
  });
};

document.addEventListener("DOMContentLoaded", main);
