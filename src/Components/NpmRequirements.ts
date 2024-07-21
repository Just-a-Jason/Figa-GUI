import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import FigaComponent from "../Figa/Components/FigaComponent";
import { create, extend } from "../Figa/Figa";

export default class NpmRequirements extends FigaComponent {
  public constructor(requirements: Record<string, string>) {
    super();

    for (const key of Object.keys(requirements)) {
      const value = requirements[key];

      const tr = create("tr");

      const name = create("td");
      const version = create("td");

      name.textContent = key;
      version.textContent = value;

      extend(tr, name);
      extend(tr, version);
      this.append(tr);
    }
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    return { element: create("table") };
  }
}
