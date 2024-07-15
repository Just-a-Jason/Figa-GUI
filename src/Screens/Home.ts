import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import Figa, { create, cssClass, extend } from "../Figa/Figa";
import ReactiveButton from "../Components/ReactiveButton";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link } from "../Figa/Router";
import "./Home.scss";

export default class Home extends FigaScreen {
  public constructor() {
    super();
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    const img = create("img");
    const url = Figa.loadAsset("icons/figa-icon.png");

    img.src = url;
    img.draggable = false;

    const box = create("div");
    const box2 = create("div");

    cssClass(box, "figa-content");
    cssClass(box2, "wrapper");

    const p = create("p");

    p.innerHTML = "Edit: <span>src/Screens/Home.ts</span> to modify the page!";
    cssClass(p, "figa-modify");

    extend(box, img);
    extend(box2, new ReactiveButton());
    extend(box2, new Link("About ✨", "/about"));
    extend(box, box2);
    extend(box, p);

    return {
      element: box,
    };
  }

  public override rendered(): void {
    // handle router navigation
    // example if user is not login navigate to "/login" page (protect the route)
    // if (!login) navigate("/login");

    // Refresh Screen all components are rerendered! ⌛
    this.refresh();
  }
}
