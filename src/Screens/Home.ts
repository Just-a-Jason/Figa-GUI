import { FigaComponentProps } from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import { create, cssClass, extend, img } from "../Figa/Figa";
import ReactiveButton from "../Components/ReactiveButton";
import FigaScreen from "../Figa/Components/FigaScreen";
import ReenderStat from "../Components/RenderStat";
import { Link } from "../Figa/Router";
import "./Home.scss";

export default class Home extends FigaScreen {
  public constructor() {
    super();
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    const start = performance.now();

    const i = img("assets/icons/figa-icon.png");

    i.draggable = false;

    const box = create("div");
    const box2 = create("div");

    cssClass(box, "figa-content");
    cssClass(box2, "wrapper");

    const p = create("p");

    p.innerHTML = "Edit: <span>src/Screens/Home.ts</span> to modify the page!";
    cssClass(p, "figa-modify");

    extend(box, i);
    extend(box2, new ReactiveButton());
    extend(box, box2);
    extend(box2, new Link("About ✨", "/about"));
    extend(box, p);
    extend(box, new ReenderStat(start));

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
