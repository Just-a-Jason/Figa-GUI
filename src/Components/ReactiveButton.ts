import { FigaComponentProps } from "../Figa/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import { create, cssClass, listen, reactive } from "../Figa/Figa";
import FigaComponent from "../Figa/Components/FigaComponent";
import "./ReactiveButton.scss";

export default class ReactiveButton extends FigaComponent {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const state = reactive(0);

    const btn = create("button");

    state.changed(
      (v) => (btn.innerHTML = `You ate <span>${v}</span> cookies! 🍪`)
    );

    listen(btn, "click", () => state.set(state.val + 1));

    btn.textContent = "Eat a cookie! 🍪";
    cssClass(btn, "reactive-button");

    return { element: btn };
  }
}
