# The Figa GUI app simplifies the process of creating Figa projects. 😊

## Build with Tauri & Figa GUI Framework 🍇

### Example GUI

![gui](https://github.com/user-attachments/assets/60659a78-bcf6-4adf-90f4-5c235b7b5ba9)

With build in router! Package size: ~20 KB ✨

### Example UI component 🧩:

```ts
import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import { create, cssClass, listen, rective } from "../Figa/Figa";
import FigaComponent from "../Figa/Components/FigaComponent";

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
```

### Example page component 🧩:

```ts
import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import Figa, { create, cssClass, extend } from "../Figa/Figa";
import ReactiveButton from "../Components/ReactiveButton";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link } from "../Figa/Router";
import "./Home.scss";

export default class Home extends FigaScreen {
  public constructor() {
    super();
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    const img = create("img");
    const url = Figa.loadAsset("icons/figa-icon.png");

    img.draggable = false;
    img.src = url;

    const box = create("div");
    const box2 = create("div");

    cssClass(box, "figa-content");
    cssClass(box2, "wrapper");

    const p = create("p");

    p.innerHTML = "Edit: <span>src/Screens/Home.ts</span> to modify the page!";
    cssClass(p, "figa-modify");

    extend(box, img);
    extend(box2, new ReactiveButton());
    extend(box2, new Link("About ✨", "/about"));
    extend(box, box2);
    extend(box, p);

    return {
      element: box,
    };
  }

  public override rendered(): void {
    // Handle router navigation
    // For example, if the user is not logged in, navigate to the "/login" page (protect the route)
    // navigate('/login')

    // Reload all components on current page! ⌛
    this.refresh();
  }
}
```

### Route management (config.ts) 🫚:

```ts
import { RoutesMap } from "./Figa/Types/RoutesMap";
import FigaScreen from "./Figa/Components/FigaScreen";
import About from "./Screens/About";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";

Figa.config({
  staticPath: "/src/assets",
});

export const routes: RoutesMap = new Map([
  ["/about", new About()],
  ["/", new Home()],
]);
```
