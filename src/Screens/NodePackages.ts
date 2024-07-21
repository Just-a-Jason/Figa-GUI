import { Link, routeContext, routeParams, RouterOptions } from "../Figa/Router";
import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import NpmRequirements from "../Components/NpmRequirements";
import FigaScreen from "../Figa/Components/FigaScreen";
import {
  boxify,
  cssClass,
  extend,
  img,
  inputNode,
  textNode,
} from "../Figa/Figa";
import "./NpmPackages.scss";

export default class NodePackages extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const { requirements } = routeContext();
    const { type } = routeParams();

    return {
      element: boxify(
        [
          cssClass(
            extend(
              textNode("p", { content: "NPM requirements" }),
              img("assets/icons/figa-icon.png")
            ),
            "wrapper"
          ),
          new NpmRequirements(requirements),
          extend(
            textNode("label", { content: "Search packages" }),
            inputNode("text", { placeHolder: "package name" })
          ),
          new Link("Go back to config page", `/create/${type}`),
        ],
        "npm-manager"
      ),
    };
  }

  public override routerTransition(): RouterOptions | null {
    return {
      animation: "slide-left",
      duration: 400,
    };
  }
}
