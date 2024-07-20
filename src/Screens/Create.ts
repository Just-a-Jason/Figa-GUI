import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import {
  boxify,
  cssClass,
  extend,
  img,
  inputNode,
  reactive,
  textNode,
} from "../Figa/Figa";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link, routeContext, routeParams, RouterOptions } from "../Figa/Router";
import "./Create.scss";

export default class Create extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const { type } = routeParams()!;

    const directory = reactive("");
    const name = reactive("");

    switch (type) {
      case "tauri":
        break;
    }

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
            inputNode("text", {
              placeHolder: "your app name",
              onChange: (e) =>
                name.set((e.currentTarget as HTMLInputElement).value),
            })
          ),
          extend(
            textNode("label", { content: "App directory: " }),
            inputNode("text", {
              placeHolder: "your app directory",
              onChange: (e) =>
                directory.set((e.currentTarget as HTMLInputElement).value),
            })
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

  public override routerTransition(): RouterOptions | null {
    return {
      animation: "slide-up",
      duration: 400,
    };
  }
}
