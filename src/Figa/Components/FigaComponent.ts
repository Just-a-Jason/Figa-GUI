import { FigaComponentProps } from "../Interfaces/FigaComponentProps";
import { FigaUITemplate } from "./FigaUITemplate";
import { extend } from "../Figa";

export default abstract class FigaComponent<
  Props extends FigaComponentProps = FigaComponentProps
> {
  protected body: FigaUITemplate<Props>;

  protected abstract template(): FigaUITemplate<Props>;

  public constructor() {
    this.body = this.initTemplate();
  }

  protected find(q: string): HTMLElement | null {
    if (this.body.element instanceof FigaComponent) {
      return this.body.element.gui.querySelector(q);
    }
    return this.body.element.querySelector(q);
  }

  public append(child: HTMLElement | FigaComponent | DocumentFragment): void {
    extend(this.body.element, child);
  }

  public remove(): void {
    if (this.body.element instanceof FigaComponent) {
      this.body.element.remove();
      return;
    }

    if (this.body.element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      this.body.element.childNodes.forEach((node) => node.remove());
      return;
    }

    (this.body.element as HTMLElement).remove();
  }

  public get gui(): HTMLElement | DocumentFragment {
    if (this.body.element instanceof FigaComponent)
      return this.body.element.gui;

    return this.body.element as HTMLElement;
  }

  private initTemplate(): FigaUITemplate<Props> {
    return this.template();
  }
}
