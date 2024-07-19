import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import FigaScreen from "../Figa/Components/FigaScreen";
import { boxify, inputNode, reactive } from "../Figa/Figa";
import { Link, RouterOptions } from "../Figa/Router";
import { Nullable } from "../Figa/Types/Nullable";
import NodePackageGUI from "../Components/NodePackageGUI";

type PackageVersion = Record<string, { name: string; version: string }>;

interface NodePackage {
  name: string;
  versions: PackageVersion[];
}

export default class Create extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    //const { type } = routeParams()!;

    let node: Nullable<NodePackageGUI> = null;

    const packageSearch = reactive("");
    const results = reactive<null | NodePackage>(null);

    const fetchPackage = async () => {
      const response = await fetch(
        `https://registry.npmjs.org/${packageSearch.val}`,
        { method: "GET" }
      );

      if (response.ok) {
        const data = await response.json();
        results.set(data);
      }
    };

    packageSearch.changed(() => fetchPackage());

    results.changed((v) => {
      if (node) node.remove();

      node = new NodePackageGUI(v!.name);
      this.append(node);
    });

    // let requirements: Record<string, string> = {
    //   tauri: "1.0.0",
    //   "figa-framework": "1.0.0",
    //   vite: "1.0.0",
    // };

    return {
      element: boxify([
        inputNode("text", {
          placeHolder: "search package",
          onChange: (e) =>
            packageSearch.set((e.currentTarget as HTMLInputElement).value),
        }),
        new Link("Home Page", "/"),
      ]),
    };
  }

  override routerTransition(): RouterOptions | null {
    return {
      animation: "slide-left",
      duration: 400,
    };
  }
}
