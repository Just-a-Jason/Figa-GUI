import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import Figa, { create, cssClass, extend } from "../Figa/Figa";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link, routeParams, RouterOptions } from "../Figa/Router";
import "./About.scss";

export default class Zakupy extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const { id } = routeParams();
    console.log(id);

    const box = create("div");
    const box2 = create("div");

    const h1 = create("h1");
    const p = create("p");

    p.textContent = `Id zakupu: ${id}`;

    h1.textContent = "Zakupy";

    const link = new Link("Home Page 🏠", "/");
    const link2 = new Link("About ✨", "/about");
    const link3 = new Link("Documentation 📚", "/about");
    const link4 = new Link("Next ⏭️", `/zakupy/${id + 1}`);

    const figa = create("img");
    figa.src = Figa.loadAsset("icons/figa-icon.png");

    extend(box, h1);

    cssClass(box2, "link-flex");

    extend(h1, figa);
    extend(box, p);
    extend(box2, link);
    extend(box2, link2);
    extend(box2, link3);
    extend(box2, link4);
    extend(box, box2);

    cssClass(box, "about");

    return {
      element: box,
    };
  }

  public override rendered(): void {
    this.refresh();
  }

  public override routerTransition(): RouterOptions | null {
    return {
      animation: "slide-left",
      duration: 400,
    };
  }
}
