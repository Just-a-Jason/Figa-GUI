import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import ReactiveButton from "../Components/ReactiveButton";
import FigaScreen from "../Figa/Components/FigaScreen";
import { boxify, img, textNode } from "../Figa/Figa";
import RenderStat from "../Components/RenderStat";
import { Link } from "../Figa/Router";
import "./Home.scss";

export default class Home extends FigaScreen {
  public constructor() {
    super();
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    const start = performance.now();

    return {
      element: boxify(
        [
          img("assets/icons/figa-icon.png"),
          boxify(
            [new ReactiveButton(), new Link("About ✨", "/about")],
            "wrapper"
          ),
          textNode("p", {
            innerHtml:
              "Edit: <span>src/Screens/Home.ts</span> to modify the page!",
            cssClasses: "figa-modify",
          }),
          new RenderStat(start),
        ],
        "figa-content"
      ),
    };
  }

  public override rendered(): void {
    // handle router navigation
    // example if user is not login navigate to "/login" page (protect the route)
    // if (!login) navigate("/login");
    // Refresh Screen all components are rerendered! ⌛
    // this.refresh();
  }
}
