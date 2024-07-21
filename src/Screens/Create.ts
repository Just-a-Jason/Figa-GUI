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
import { Link, routeParams, RouterOptions } from "../Figa/Router";
import "./Create.scss";

export default class Create extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const { type } = routeParams()!;

    const directory = reactive("");
    const name = reactive("");

    let requirements: Record<string, string> = {};

    switch (type) {
      case "tauri":
        requirements = {
          "@tauri-apps/cli": "^1",
          cpx: "^1.5.0",
          typescript: "^5.2.2",
          vite: "^5.3.1",
          "@tauri-apps/api": "^1",
          sass: "^1.77.8",
        };
        break;
      default:
        requirements = {
          typescript: "^5.2.2",
          vite: "^5.3.1",
          sass: "^1.77.8",
          cpx: "^1.5.0",
        };
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
          boxify(
            [
              cssClass(new Link("Home page 🏠", "/"), "back-button"),
              cssClass(
                extend(
                  new Link(
                    "Manage node packages",
                    `/create/${type}/npm-packages`,
                    {
                      requirements: requirements,
                    }
                  ),
                  img("assets/icons/npm.svg")
                ),
                "wrapper"
              ),
            ],
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
