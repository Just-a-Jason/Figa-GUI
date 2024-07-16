import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import Figa, { create, cssClass, extend } from "../Figa/Figa";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link } from "../Figa/Router";
import "./About.scss";

export default class About extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const box = create("div");
    const box2 = create("div");

    const h1 = create("h1");

    h1.textContent = "About Page";

    const link = new Link("Home Page 🏠", "/");
    const link2 = new Link("Documentation 📚", "/docs");

    const figa = create("img");
    figa.src = Figa.loadAsset("icons/figa-icon.png");

    const paragraphs = [
      "Figa is a lightweight framework ~ 20KB with build in router.",
      "Made by: @Jason.json",
    ];

    extend(box, h1);

    paragraphs.forEach((par) => {
      const p = create("p");
      p.textContent = par;
      extend(box, p);
    });

    cssClass(box2, "link-flex");

    extend(h1, figa);
    extend(box2, link);
    extend(box2, link2);
    extend(box, box2);

    cssClass(box, "about");

    return {
      element: box,
    };
  }
}
