import { RoutesMap } from "./Figa/Types/RoutesMap";
import About from "./Screens/About";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";

Figa.config({
  staticPath: "",
});

export const routes: RoutesMap = {
  "/about": About,
  "/": Home,
};
