import FigaComponent from "./Components/FigaComponent";
import FigaConfig from "./Interfaces/FigaConfig";
import { RoutesMap } from "./Types/RoutesMap";
import { Nullable } from "./Types/Nullable";
import Router, { RouterOptions } from "./Router";

export const removeChildren = (el: HTMLElement | FigaComponent) => {
  if (el instanceof FigaComponent) el = el.gui;
  el.childNodes.forEach((n) => n.remove());
};

export const create = <K extends keyof HTMLElementTagNameMap>(
  el: K
): HTMLElementTagNameMap[K] => {
  return document.createElement(el);
};

export const extend = (
  target: HTMLElement | FigaComponent,
  component: FigaComponent | HTMLElement
) => {
  if (target instanceof FigaComponent) target = target.gui;

  if (component instanceof FigaComponent) component = component.gui;

  target.appendChild(component);
};

export const find = (query: string, all: boolean = false) =>
  all ? document.querySelectorAll(query) : document.querySelector(query);

export const wrap = (
  elements: (FigaComponent | HTMLElement | DocumentFragment)[]
): DocumentFragment => {
  const fragment = document.createDocumentFragment();

  elements.forEach((el) => {
    if (el instanceof FigaComponent) {
      fragment.append(el.gui);
    } else {
      fragment.append(el);
    }
  });

  return fragment;
};

export default class Figa {
  private static _root: Nullable<HTMLElement> = null;
  private static _config: Nullable<FigaConfig> = null;
  public static router: Nullable<Router> = null;

  public static initRouter(
    root: HTMLElement,
    routes: RoutesMap = new Map(),
    options: RouterOptions = {
      animation: "slide-left",
      transition: 400,
    }
  ): void {
    if (this.router) {
      console.warn("Figa framework is already initialized! ⚠️");
      return;
    }

    Figa._root = root;
    Figa.router = new Router(routes, root, options);

    const { transition } = Figa.router.options;

    setTimeout(() => Figa.router!.navigate("/"), transition);
  }

  public static render(component: FigaComponent) {
    this._root?.appendChild(component.gui);
  }

  public static config(config: FigaConfig): void {
    let index =
      config.staticPath.length - 1 > 0 ? config.staticPath.length - 1 : 0;

    if (config.staticPath[index] === "/") {
      while (index > 0 && config.staticPath[index] === "/") {
        config.staticPath = config.staticPath.slice(0, index);
        index = config.staticPath.length - 1;
      }
    }

    Figa._config = config;
  }

  public static loadAsset(path: string): string {
    if (!this._config) {
      throw new Error(
        'Figa.config.staticPath is not defined. Add: Figa.config("\n{\nstaticPath: "yourpath"\n}\n") in main.ts file.'
      );
    }

    return this._config.staticPath + "/" + path;
  }
}

class Reactive<T> {
  private callBacks: ((current?: T, last?: T) => void)[] = [];

  public constructor(public val: T, public prev: T = val) {}

  public set(value: T): void {
    this.prev = this.val;
    this.val = value;

    this.callBacks.forEach((call) => call(this.val, this.prev));
  }

  public onValueChanged(callback: (current?: T, last?: T) => void) {
    this.callBacks.push(callback);
  }
}

export const listen = (
  el: HTMLElement,
  ev: keyof HTMLElementEventMap,
  call: (e: Event) => void
) => el.addEventListener(ev, call);

export const rective = <T>(value: T) => new Reactive(value);

/**
 *
 * @param el - HtmlElement
 * @param cl - String | string[] of css classe(s)
 */
export const cssClass = (el: HTMLElement, cls: string[] | string): void => {
  if (typeof cls === "string") {
    el.classList.add(cls);
    return;
  }

  cls.forEach((cl) => el.classList.add(cl));
};