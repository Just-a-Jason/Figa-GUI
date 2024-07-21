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
  reactive,
  textNode,
} from "../Figa/Figa";
import "./NpmPackages.scss";
import { Nullable } from "../Figa/Types/Nullable";
import NpmPackageList from "../Components/NpmPackageList";

export default class NodePackages extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const { requirements, config } = routeContext();
    const { type } = routeParams();

    const baseUrl = "https://registry.npmjs.org/-/v1/search?";
    const npmList = reactive<Nullable<NpmPackageList>>(null);

    const fetchPackages = async (query: string) => {
      const req = await fetch(baseUrl + `text=${query}`);

      if (req.ok) {
        if (npmList.val) npmList.val.remove();

        const data = await req.json();
        const list = new NpmPackageList(data);
        this.append(list);
        npmList.set(list);
      }
    };

    return {
      element: boxify(
        [
          boxify(
            [
              textNode("label", { content: "Search packages" }),
              inputNode("text", {
                placeHolder: "package name",
                onChange: (e) =>
                  fetchPackages((e.currentTarget as HTMLInputElement).value),
              }),
              new Link("Config page", `/create/${type}`, {
                config: config,
              }),
            ],
            "search-bar"
          ),
          cssClass(
            extend(
              textNode("p", { content: "NPM requirements" }),
              img("assets/icons/figa-icon.png")
            ),
            "wrapper"
          ),
          new NpmRequirements(requirements),
        ],
        "npm-manager"
      ),
    };
  }

  public override routerTransition(): RouterOptions | null {
    return {
      animation: "slide-right",
      duration: 400,
    };
  }
}
