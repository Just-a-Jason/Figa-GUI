import { RoutesMap } from "./Figa/Types/RoutesMap";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";
import Create from "./Screens/Create";

Figa.config({
  staticPath: "src/",
});

export const routes: RoutesMap = {
  "/create/{type}": Create,
  "/create/{type}/npm-packages": Create,
  "/": Home,
};
