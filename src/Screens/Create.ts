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
import { Link, routeParams, RouterOptions, routeContext } from "../Figa/Router";
import "./Create.scss";

export default class Create extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const { type } = routeParams();

    const { config } = routeContext();

    const dir = reactive("");
    const name = reactive("");

    if (config) {
      name.set(config.name.val);
      dir.set(config.dir.val);
    }

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
              value: name.val,
            })
          ),
          extend(
            textNode("label", { content: "App directory: " }),
            inputNode("text", {
              placeHolder: "your app directory",
              onChange: (e) =>
                dir.set((e.currentTarget as HTMLInputElement).value),
              value: dir.val,
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
                      config: {
                        name: name,
                        dir: dir,
                      },
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
