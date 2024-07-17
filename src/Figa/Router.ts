import { FigaComponentProps } from "./Components/Interfaces/FigaComponentProps";
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
  private _context: Record<string, any> = {};
  private history: string[] = [];
  private currentRoute = "";

  constructor(
    private routes: RoutesMap = new Map(),
    private target: FigaComponent | HTMLElement,
    private _options: RouterOptions
  ) {
    const { duration: transition } = _options;

    this.updateTransition(transition);
  }

  public pushHistory(path: string) {
    if (this.history.length < 200) this.history.push(path);
    else this.history[this.history.length - 1] = path;
  }

  public register(route: string, component: FigaScreen): void {
    this.routes.set(route, component);
  }

  public navigate(path: string, context: Record<string, any> = {}): void {
    this._context = context;

    let { animation, duration: transition } = this._options;

    const match = this.matchRoute(path);
    const route = this.routes.get(match as string);
    const routeAnim = route?.routerTransition();

    if (routeAnim) {
      this.updateTransition(transition);
      transition = routeAnim.duration;
      animation = routeAnim.animation;
    }

    const changeRoute = () => {
      removeChildren(this.target);

      path = path.trim();

      if (!route) {
        const warning = `Route: "${path}" does not exists! Use router.register(string, FigaScreen) to add new route.`;

        extend(this.target, new Warning(warning));
        this.currentRoute = path;
        console.warn(warning);
        return;
      }

      this.currentRoute = path;

      extend(this.target, route);
      route.rendered();
    };

    let t = this.target;
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
    let t = this.target;

    t = t instanceof FigaComponent ? (t.gui as HTMLElement) : t;
    t.style.transition = `${transition}ms`;
  }

  public get current(): string {
    return this.currentRoute;
  }

  public get context(): Record<string, any> {
    return this._context;
  }

  public get options(): RouterOptions {
    return this._options;
  }

  public matchRoute(route: string): string | undefined {
    for (const ref of this.routes.keys()) {
      if (validate(ref, route)) return ref;
    }

    return undefined;
  }
}

export class Link extends FigaComponent {
  public constructor(text: string, to: string) {
    super();

    (this.body.element as HTMLAnchorElement).href = to;
    (this.body.element as HTMLElement).textContent = text;
    (this.body.element as HTMLElement).title = to;

    (this.body.element as HTMLAnchorElement).addEventListener("click", (e) => {
      e.preventDefault();
      Figa.router?.pushHistory(to);
      navigate(to);
    });
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    return { element: create("a") };
  }
}

export const navigate = (path: string) => Figa.router?.navigate(path);
export const route = (): string => Figa.router?.current as string;

const isParam = (route: string) =>
  route.indexOf("{") > -1 && route.indexOf("}");

const validate = (ref: string | string[], url: string | string[]): boolean => {
  if (typeof ref === "string") ref = ref.trim().split("/");
  if (typeof url === "string") url = url.trim().split("/");

  if (ref.length !== url.length) return false;

  for (let i = 0; i < ref.length; i++) {
    if (isParam(ref[i].trim())) continue;
    if (ref[i] !== url[i]) return false;
  }
  return true;
};

const parseParams = (url: string | string[]): Record<string, any> => {
  const params: Record<string, any> = {};

  if (typeof url === "string") {
    let ref: undefined | string | string[] = Figa.router?.matchRoute(url);
    if (!ref) return params;

    ref = ref.trim().split("/");

    if (!validate(ref, url)) return params;
    url = url.trim().split("/");

    for (let i = 0; i < ref.length; i++) {
      let param = ref[i];

      if (!isParam(param)) continue;

      param = param.slice(1, param.length - 1);

      const parsed = parseFloat(url[i]);

      if (Number.isNaN(parsed)) {
        params[param] = url[i];
        continue;
      }

      params[param] = parsed;
    }
  }

  return params;
};

export const routeParams = () => {
  return parseParams(route());
};
