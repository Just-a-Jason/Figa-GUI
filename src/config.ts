import { RoutesMap } from "./Figa/Types/RoutesMap";
import NodePackages from "./Screens/NodePackages";
import Create from "./Screens/Create";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";

Figa.config({
  staticPath: "",
});

export const routes: RoutesMap = {
  "/create/{type}/npm-packages": NodePackages,
  "/create/{type}": Create,
  "/": Home,
};
