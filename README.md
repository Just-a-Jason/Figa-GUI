# The Figa GUI app simplifies the process of creating Figa projects. 😊

## Build with Tauri & Figa GUI Framework 🍇

### Example GUI

![gui](https://github.com/user-attachments/assets/60659a78-bcf6-4adf-90f4-5c235b7b5ba9)

With build in router! Package size: ~20 KB ✨

### GUI 🖼️:

![figa](https://github.com/user-attachments/assets/43c0d89f-c620-4cbd-a59f-9c2dfa2f7e09)

### Example UI component 🧩:

```ts
import { FigaComponentProps } from "../Figa/Components/Interfaces/FigaComponentProps";
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
```

### Example page component 🧩:

```ts
import { FigaComponentProps } from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import { boxify, create, cssClass, img } from "../Figa/Figa";
import ReactiveButton from "../Components/ReactiveButton";
import FigaScreen from "../Figa/Components/FigaScreen";
import ReenderStat from "../Components/RenderStat";
import { Link } from "../Figa/Router";

export default class Home extends FigaScreen {
  public constructor() {
    super();
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    const start = performance.now();

    const i = img("assets/icons/figa-icon.png");

    const p = create("p");

    p.innerHTML = "Edit: <span>src/Screens/Home.ts</span> to modify the page!";
    cssClass(p, "figa-modify");

    return {
      element: boxify(
        [
          i,
          boxify(
            [new ReactiveButton(), new Link("About ✨", "/about")],
            "wrapper"
          ),
          p,
          new ReenderStat(start),
        ],
        "figa-content"
      ),
    };
  }

  public override rendered(): void {
    // handle router navigation
    // example if user is not login navigate to "/login" page (protect the route)
    // if (!login) navigate("/login");
    // Refresh Screen all components are rerendered! ⌛

    this.refresh();
  }
}
```

### Route management (config.ts) 🫚:

```ts
import FigaScreen from "./Figa/Components/FigaScreen";
import { RoutesMap } from "./Figa/Types/RoutesMap";
import About from "./Screens/About";
import Home from "./Screens/Home";
import Figa from "./Figa/Figa";

Figa.config({
  staticPath: "",
});

export const routes: RoutesMap = new Map([
  ["/about", new About() as FigaScreen],
  ["/", new Home()],
]);
```

### App initialization (main.ts) 🫧💾:

```ts
import Figa, { find } from "./Figa/Figa";
import { routes } from "./config";

// Main figa app entry 🍇
const main = () => {
  const root = find("#app") as HTMLElement;

  Figa.initRouter(root, routes, {
    animation: "slide-up",
    duration: 400,
  });
};

document.addEventListener("DOMContentLoaded", main);
```
