import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { Link, RouterOptions as RouterTransitionOptions } from "../Figa/Router";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import FigaScreen from "../Figa/Components/FigaScreen";
import { create, cssClass, extend } from "../Figa/Figa";
import "./Home.scss";
import "./About.scss";

export default class About extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const box = create("div");

    const h1 = create("h1");
    h1.textContent = "About Page";

    const link = new Link("Home Page 🏠", "/");

    extend(box, h1);
    extend(box, link);
    cssClass(box, "about");

    return {
      element: box,
    };
  }

  public routerTransition(): RouterTransitionOptions | null {
    return {
      animation: "slide-right",
      duration: 400,
    };
  }
}
