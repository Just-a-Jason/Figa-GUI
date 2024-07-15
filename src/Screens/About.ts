import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import FigaScreen from "../Figa/Components/FigaScreen";
import { create, extend } from "../Figa/Figa";
import { Link } from "../Figa/Router";
import "./Home.scss";

export default class About extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const box = create("div");

    const h1 = create("h1");
    h1.textContent = "About Page";

    extend(box, h1);
    extend(box, new Link("Home Page", "/"));

    return {
      element: box,
    };
  }
}
