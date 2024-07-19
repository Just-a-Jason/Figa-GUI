export type InputNodeType =
  | "button"
  | "password"
  | "text"
  | "number"
  | "submit";

export interface HtmlInputNodeProps {
  cssClasses?: string | string[];
  placeHolder: string;
  content?: string;
  value?: string;
  name?: string;
  id?: string;

  onChange?: (e: Event) => void;
}
