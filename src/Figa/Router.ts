import { FigaComponentProps } from "./Interfaces/FigaComponentProps";
import Figa, { create, extend, removeChildren } from "../Figa/Figa";
import { FigaUITemplate } from "./Components/FigaUITemplate";
import { RouterAnimation } from "./Types/RouterAnimation";
import FigaComponent from "./Components/FigaComponent";
import { Constructor, RoutesMap } from "./Types/RoutesMap";
import FigaScreen from "./Components/FigaScreen";
import Warning from "./Build in/UI/Warning";

export interface RouterOptions {
  animation: RouterAnimation;
  duration: number;
}

const isParam = (route: string) =>
  route.indexOf("{") > -1 && route.indexOf("}") > -1;

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

export default class Router {
  private _context: Record<string, any> = {};
  private currentRoute = "";

  constructor(
    private routes: RoutesMap,
    private target: FigaComponent | HTMLElement,
    private _options: RouterOptions
  ) {
    const { duration: transition } = _options;

    this.updateTransition(transition);
  }

  public register(route: string, screen: Constructor<FigaScreen>): void {
    this.routes[route] = screen;
  }

  public navigate(path: string, context: Record<string, any> = {}): void {
    this.currentRoute = path;
    this._context = context;

    let { animation, duration: transition } = this._options;

    const match = this.matchRoute(path);
    let route = this.routes[match as string];

    if (route !== undefined && !(route instanceof FigaScreen)) {
      route = new route();
      const routeAnim = route?.routerTransition();

      if (routeAnim) {
        this.updateTransition(transition);
        transition = routeAnim.duration;
        animation = routeAnim.animation;
      }
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

      extend(this.target, route as FigaScreen);
      (route as FigaScreen).rendered();
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

  private matchRoute(route: string): string | undefined {
    for (const ref of Object.keys(this.routes)) {
      if (validate(ref, route)) return ref;
    }

    return undefined;
  }

  public parseUrlParams(): Record<string, any> {
    const params: Record<string, any> = {};

    const url = this.currentRoute.trim().split("/");

    let ref: undefined | string | string[] = this.matchRoute(this.currentRoute);

    if (!ref) return params;

    ref = ref.trim().split("/");

    if (!validate(ref, url)) return params;

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

    return params;
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
      navigate(to);
    });
  }

  protected template(): FigaUITemplate<FigaComponentProps> {
    return { element: create("a") };
  }
}

export const navigate = (path: string) => Figa.router?.navigate(path);
export const route = (): string => Figa.router?.current as string;

export const routeParams = () => {
  return Figa.router?.parseUrlParams();
};
