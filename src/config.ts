import FigaScreen from "./Figa/Components/FigaScreen";
import { RoutesMap } from "./Figa/Types/RoutesMap";
import About from "./Screens/About";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";
import Docs from "./Screens/Docs";
import Zakupy from "./Screens/Zakupy";

Figa.config({
  staticPath: "/src/assets",
});

export const routes: RoutesMap = new Map([
  ["/", new Home()],
  ["/about", new About() as FigaScreen],
  ["/docs", new Docs()],
  ["/zakupy/{id}", new Zakupy()],
]);
