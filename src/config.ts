import { RoutesMap } from "./Figa/Types/RoutesMap";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";
import Create from "./Screens/Create";

Figa.config({
  staticPath: "",
});

export const routes: RoutesMap = {
  "/create/{type}": Create,
  "/": Home,
};
