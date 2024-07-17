import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import { boxify, create, extend, img } from "../Figa/Figa";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link } from "../Figa/Router";
import "./About.scss";

export default class About extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const h1 = create("h1");

    h1.textContent = "About Page";

    const figa = img("assets/icons/figa-icon.png");
    extend(h1, figa);

    const box = boxify([h1], "about");
    const paragraphs = [
      "Figa is a lightweight framework ~ 20KB with build in router.",
      "Made by: @Jason.json",
    ];

    paragraphs.forEach((par) => {
      const p = create("p");
      p.textContent = par;
      extend(box, p);
    });

    const links = boxify(
      [
        new Link("Home Page 🏠", "/"),
        new Link("Not existing route 👻", "/not existing route"),
      ],
      "link-flex"
    );

    extend(box, links);

    return {
      element: box,
    };
  }
}
