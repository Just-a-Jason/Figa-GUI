import Figa, { find } from "./Figa/Figa";
import { routes } from "./config";

// Main figa app entry 🍇
const main = () => {
  const root = find("#app") as HTMLElement;

  Figa.initRouter(root, routes, {
    animation: "slide-up",
    duration: 400,
  });
};

document.addEventListener("DOMContentLoaded", main);

// to do: https://registry.npmjs.org/{package}
