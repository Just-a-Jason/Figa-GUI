import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import {
  boxify,
  cssClass,
  extend,
  img,
  inputNode,
  textNode,
} from "../Figa/Figa";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link, routeParams, RouterOptions } from "../Figa/Router";
import "./Create.scss";

export default class Create extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const { type } = routeParams()!;

    return {
      element: boxify(
        [
          extend(
            textNode("p", {
              content: `Configure your ${type} figa app`,
              cssClasses: "wrapper",
            }),
            img("assets/icons/figa-icon.png")
          ),
          extend(
            textNode("label", { content: "App name: " }),
            inputNode("text", { placeHolder: "your app name" })
          ),
          extend(
            textNode("label", { content: "App directory: " }),
            inputNode("text", { placeHolder: "your app directory" })
          ),
          cssClass(
            extend(
              new Link("Manage node packages", `/create/${type}/npm-packages`),
              img("assets/icons/npm.svg")
            ),
            "wrapper"
          ),
        ],
        "create-screen"
      ),
    };
  }

  override routerTransition(): RouterOptions | null {
    return {
      animation: "slide-left",
      duration: 400,
    };
  }
}
