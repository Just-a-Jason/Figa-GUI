import { RoutesMap } from "./Figa/Types/RoutesMap";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";
import About from "./Screens/About";
import FigaScreen from "./Figa/Components/FigaScreen";

Figa.config({
  staticPath: "/src/assets",
});

export const routes: RoutesMap = new Map([
  ["/", new Home()],
  ["/about", new About() as FigaScreen],
]);
