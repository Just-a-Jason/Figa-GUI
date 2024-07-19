import FigaComponent from "./Components/FigaComponent";
import Router, { RouterOptions } from "./Router";
import FigaConfig from "./Interfaces/FigaConfig";
import { RoutesMap } from "./Types/RoutesMap";
import { Nullable } from "./Types/Nullable";
import { HtmlTextNode, HtmlTextNodeProps } from "./Types/HtmlTextNode";
import { HtmlInputNodeProps, InputNodeType } from "./Types/HtmlInputNodeProps";

export const removeChildren = (
  el: HTMLElement | FigaComponent | DocumentFragment
) => {
  if (el instanceof FigaComponent) el = el.gui;
  el.childNodes.forEach((n) => {
    n.remove();
  });
};

export const create = <K extends keyof HTMLElementTagNameMap>(
  el: K
): HTMLElementTagNameMap[K] => {
  return document.createElement(el);
};

export const extend = (
  target: HTMLElement | FigaComponent | DocumentFragment,
  component: HTMLElement | FigaComponent | DocumentFragment
) => {
  if (target instanceof FigaComponent) target = target.gui as HTMLElement;

  if (component instanceof FigaComponent) component = component.gui;

  if (component.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    component.childNodes.forEach((node) => {
      extend(target, node as HTMLElement);
    });
    return target;
  }
  target.appendChild(component);
  return target;
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
    routes: RoutesMap,
    options: RouterOptions = {
      animation: "slide-left",
      duration: 400,
    }
  ): void {
    if (this.router) {
      console.warn("Figa framework is already initialized! ⚠️");
      return;
    }

    Figa._root = root;
    Figa.router = new Router(routes, root, options);

    const { duration } = Figa.router.options;

    setTimeout(() => Figa.router!.navigate("/"), duration);
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
  private callback: (current?: T, last?: T) => void = () => {};

  public constructor(public val: T, public prev: T = val) {}

  public set(value: T): void {
    this.prev = this.val;
    this.val = value;

    this.callback(this.val, this.prev);
  }

  public changed(callback: (current?: T, last?: T) => void) {
    this.callback = callback;
  }
}

export const listen = (
  el: HTMLElement,
  ev: keyof HTMLElementEventMap,
  call: (e: Event) => void
) => el.addEventListener(ev, call);

export const reactive = <T>(value: T) => new Reactive(value);

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

export const boxify = (
  elements: (FigaComponent | HTMLElement | DocumentFragment)[],
  cls?: string[] | string
): HTMLDivElement => {
  const div = create("div");

  elements.forEach((el) => {
    if (el instanceof FigaComponent) el = el.gui;
    div.appendChild(el);
  });

  if (cls) cssClass(div, cls);
  return div;
};

export const img = (src: string, alt?: string): HTMLImageElement => {
  const img = create("img");
  img.src = Figa.loadAsset(src);
  img.draggable = false;

  if (alt) img.alt = alt;

  return img;
};

export const textNode = <K extends HtmlTextNode>(
  type: K,
  props: HtmlTextNodeProps
): HTMLElementTagNameMap[K] => {
  const el = create(type);

  if (props.content) el.textContent = props.content;
  if (props.innerHtml) el.innerHTML = props.innerHtml;
  if (props.cssClasses) {
    if (typeof props.cssClasses === "string")
      el.classList.add(props.cssClasses);
    else props.cssClasses.forEach((css) => el.classList.add(css));
  }

  return el;
};

export const inputNode = <K extends InputNodeType>(
  type: K,
  props: HtmlInputNodeProps
): HTMLInputElement => {
  const el = create("input");

  if (props.onChange) el.addEventListener("change", props.onChange);
  if (props.placeHolder) el.placeholder = props.placeHolder;
  if (props.value) el.value = props.value;
  if (props.name) el.name = props.name;
  if (props.id) el.id = props.id;
  el.type = type;

  return el;
};
