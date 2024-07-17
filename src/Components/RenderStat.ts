import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import FigaComponent from "../Figa/Components/FigaComponent";
import { create } from "../Figa/Figa";
import "./RenderStat.scss";

export default class ReenderStat extends FigaComponent {
  public constructor(start: number) {
    super();

    const time = (performance.now() - start).toFixed(3);

    (
      this.body.element as HTMLParagraphElement
    ).textContent = `Rendering this page took ${time} ms! ✨`;
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    const p = create("p");
    p.textContent = "Calculating render time... ✨";
    return { element: p };
  }
}
