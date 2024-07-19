import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import FigaScreen from "../Figa/Components/FigaScreen";
import { boxify, textNode, extend, img } from "../Figa/Figa";
import "./Home.scss";
import { Link } from "../Figa/Router";

export default class Home extends FigaScreen {
  public constructor() {
    super();
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    return {
      element: boxify(
        [
          boxify(
            [
              extend(
                textNode("h1", { content: "Welcome to figa app!" }),
                img("assets/icons/figa-icon.png")
              ),
            ],
            "box"
          ),
          boxify(
            [
              textNode("p", { content: "Choose your type of app! ✨" }),
              boxify(
                [
                  extend(
                    new Link("Tauri App", "/create/tauri"),
                    img("assets/icons/npm.svg")
                  ),
                  extend(
                    new Link("Website", "/create/website"),
                    img("assets/icons/npm.svg")
                  ),
                ],
                "buttons"
              ),
            ],
            "box"
          ),
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
