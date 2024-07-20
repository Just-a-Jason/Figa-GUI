import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link, routeContext, routeParams, RouterOptions } from "../Figa/Router";
import { boxify, textNode } from "../Figa/Figa";

export default class NodePackages extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const { requirements } = routeContext();
    const { type } = routeParams();

    return {
      element: boxify([
        textNode("p", { content: "Node packages manager" }),
        new Link("Go back to config page", `/create/${type}`),
      ]),
    };
  }

  public override routerTransition(): RouterOptions | null {
    return {
      animation: "slide-left",
      duration: 400,
    };
  }
}
