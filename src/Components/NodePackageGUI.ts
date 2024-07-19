import FigaComponent from "../Figa/Components/FigaComponent";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import { boxify, textNode } from "../Figa/Figa";
import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";

interface Props extends FigaComponentProps {
  h3: HTMLHeadingElement;
}

export default class NodePackageGUI extends FigaComponent {
  constructor(text: string) {
    super();

    const { h3 } = this.body.structure!;

    h3.textContent = text;
  }

  protected template(): FigaUITemplate<Props> {
    const h3 = textNode("h3", { content: "Loading package..." });

    return {
      element: boxify([h3]),
      structure: {
        h3: h3,
      },
    };
  }
}
