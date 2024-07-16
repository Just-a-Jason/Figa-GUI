import FigaComponentProps from "./Components/Interfaces/FigaComponentProps";
import Figa, { create, extend, removeChildren } from "../Figa/Figa";
import { FigaUITemplate } from "./Components/FigaUITemplate";
import { RouterAnimation } from "./Types/RouterAnimation";
import FigaComponent from "./Components/FigaComponent";
import { RoutesMap } from "./Types/RoutesMap";
import FigaScreen from "./Components/FigaScreen";
import Warning from "./Build in/UI/Warning";

export interface RouterOptions {
  animation: RouterAnimation;
  duration: number;
}

export default class Router {
  constructor(
    private _routes: RoutesMap = new Map(),
    private _target: FigaComponent | HTMLElement,
    private _options: RouterOptions,
    private _allowSameOrigin: boolean = true,
    private currentRoute = ""
  ) {
    const { duration: transition } = _options;

    this.updateTransition(transition);
  }

  public register(route: string, component: FigaScreen): void {
    this._routes.set(route, component);
  }

  public navigate(path: string): void {
    let { animation, duration: transition } = this._options;

    const route = this._routes.get(path) as FigaScreen;
    const routeAnim = route?.routerTransition();

    if (routeAnim) {
      this.updateTransition(transition);
      transition = routeAnim.duration;
      animation = routeAnim.animation;
    }

    const changeRoute = () => {
      removeChildren(this._target);

      path = path.trim();

      if (!this._allowSameOrigin && this.currentRoute === path) return;

      if (!route) {
        const warning = `Route: "${path}" does not exists! Use router.register(string, FigaScreen) to add new route.`;

        extend(this._target, new Warning(warning));
        this.currentRoute = path;
        console.warn(warning);
        return;
      }

      extend(this._target, route);
      this.currentRoute = path;
      route.rendered();
    };

    let t = this._target;
    if (t instanceof FigaComponent) t = t.gui as HTMLElement;

    setTimeout(() => {
      changeRoute();
    }, transition);

    const animOut = () => {
      switch (animation) {
        case "fade":
          t.style.opacity = "1";
          break;
        case "scale":
          t.style.transform = "scale(1)";
          break;
        case "squish-x":
          t.style.transform = "scaleX(1)";
          break;
        case "squish-y":
          t.style.transform = "scaleY(1)";
          break;
        case "slide-right":
        case "slide-left":
          t.style.transform = "translateX(0)";
          break;
        case "slide-up":
        case "slide-down":
          t.style.transform = "translateY(0)";
          break;
      }
    };

    setTimeout(() => {
      animOut();
    }, transition);

    const animIn = () => {
      switch (animation) {
        case "fade":
          t.style.opacity = "0";
          break;
        case "scale":
          t.style.transform = "scale(0)";
          break;
        case "squish-x":
          t.style.transform = "scaleX(0)";
          break;
        case "squish-y":
          t.style.transform = "scaleY(0)";
          break;
        case "slide-right":
          t.style.transform = "translateX(200vh)";
          break;
        case "slide-left":
          t.style.transform = "translateX(-200vh)";
          break;
        case "slide-up":
          t.style.transform = "translateY(-200vh)";
          break;
        case "slide-down":
          t.style.transform = "translateY(200vh)";
          break;
      }
    };

    animIn();
  }

  private updateTransition(transition: number) {
    let t = this._target;

    t = t instanceof FigaComponent ? (t.gui as HTMLElement) : t;
    t.style.transition = `${transition}ms`;
  }

  public get current(): string {
    return this.currentRoute;
  }

  public get options(): RouterOptions {
    return this._options;
  }
}

export class Link extends FigaComponent {
  public constructor(text: string, to: string) {
    super();

    (this.body.element as HTMLAnchorElement).href = to;
    (this.body.element as HTMLElement).textContent = text;

    (this.body.element as HTMLAnchorElement).addEventListener("click", (e) => {
      e.preventDefault();
      navigate(to);
    });
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    return { element: create("a") };
  }
}

export const navigate = (path: string) => Figa.router?.navigate(path);
export const route = (): string => Figa.router?.current as string;

export const params = (ref: string, url: string): object | null => {
  const isParam = (route: string) =>
    route.indexOf("{") > -1 && route.indexOf("}");

  const params: { [index: string]: any } = {};

  const validate = (ref: string[], url: string[]) => {
    if (ref.length !== url.length) return false;

    for (let i = 0; i < ref.length; i++) {
      if (isParam(ref[i])) {
        let param = ref[i].trim();
        param = param.slice(1, param.length - 1);
        params[param] = url[i];
        continue;
      }
      if (ref[i] !== url[i]) return false;
    }
    return true;
  };

  if (validate(ref.trim().split("/"), url.trim().split("/"))) return params;

  return null;
};
