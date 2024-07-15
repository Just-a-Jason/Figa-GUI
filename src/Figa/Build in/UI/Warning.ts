import FigaComponentProps from "../../Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../../Components/FigaUITemplate";
import FigaComponent from "../../Components/FigaComponent";
import { create, cssClass, extend } from "../../Figa";
import { Link } from "../../Router";
import "./Warning.scss";

export default class Warning extends FigaComponent {
  public constructor(text: string) {
    super();

    (this.body.element as HTMLParagraphElement).textContent = text + "⚠️";
    extend(
      this.body.element as HTMLElement,
      new Link("Go back to home page", "/")
    );
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    const p = create("p");
    cssClass(p, "figa-warning");
    return { element: p };
  }
}
