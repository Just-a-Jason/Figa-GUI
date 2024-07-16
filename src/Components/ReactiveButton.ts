import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import { create, cssClass, listen, rective } from "../Figa/Figa";
import FigaComponent from "../Figa/Components/FigaComponent";
import "./ReactiveButton.scss";

export default class ReactiveButton extends FigaComponent {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const state = rective(0);

    const btn = create("button");

    state.onValueChanged(
      (v) => (btn.innerHTML = `You ate <span>${v}</span> cookies! 🍪`)
    );

    listen(btn, "click", () => state.set(state.val + 1));

    btn.textContent = "Eat a cookie! 🍪";
    cssClass(btn, "reactive-button");

    return { element: btn };
  }
}
