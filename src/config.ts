import FigaScreen from "./Figa/Components/FigaScreen";
import { RoutesMap } from "./Figa/Types/RoutesMap";
import About from "./Screens/About";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";

Figa.config({
  staticPath: "",
});

export const routes: RoutesMap = new Map([
  ["/", new Home()],
  ["/about", new About() as FigaScreen],
]);
