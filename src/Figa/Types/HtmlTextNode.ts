export type HtmlTextNode =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "code"
  | "span"
  | "b"
  | "i"
  | "blockquote";

export interface HtmlTextNodeProps {
  cssClasses?: string | string[];
  innerHtml?: string;
  content?: string;
}
