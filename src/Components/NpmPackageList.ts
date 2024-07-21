import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import FigaComponent from "../Figa/Components/FigaComponent";
import { boxify, create, extend } from "../Figa/Figa";

interface SearchResult {
  objects: NpmPackage[];
}

interface NpmPackage {
  package: NpmPackageDetails;
}

interface NpmPackageDetails {
  name: string;
  version: string;
  date: string;
}

interface Props extends FigaComponentProps {
  table: HTMLTableElement;
}

export default class NpmPackageList extends FigaComponent {
  public constructor(packages: SearchResult) {
    super();

    const { table } = this.body.structure!;

    console.log(packages);
    packages.objects.forEach((pack) => {
      const tr = create("tr");

      let td = create("td");
      td.textContent = pack.package.name;
      extend(tr, td);

      td = create("td");
      td.textContent = pack.package.version;
      extend(tr, td);
      extend(table, tr);
    });
  }

  protected template(): FigaUITemplate<Props> {
    const table = create("table");

    return {
      element: boxify([table], "package-view"),
      structure: {
        table: table,
      },
    };
  }
}
