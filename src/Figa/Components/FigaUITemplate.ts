import FigaComponent from "./FigaComponent";

export type FigaUITemplate<T extends object> = {
  element: HTMLElement | DocumentFragment | FigaComponent;
  structure?: T;
};
