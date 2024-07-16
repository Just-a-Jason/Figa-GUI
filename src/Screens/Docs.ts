import FigaComponentProps from "../Figa/Components/Interfaces/FigaComponentProps";
import { FigaUITemplate } from "../Figa/Components/FigaUITemplate";
import Figa, { create, cssClass, extend } from "../Figa/Figa";
import FigaScreen from "../Figa/Components/FigaScreen";
import { Link } from "../Figa/Router";
import "./About.scss";

interface DOC {
  name: string;
  functions: [{ name: string; description: string }];
}

export default class Docs extends FigaScreen {
  protected template(): FigaUITemplate<FigaComponentProps> {
    const box = create("div");
    const box2 = create("div");

    const loadDocs = async () => {
      const response = await fetch("src/docs.json");

      if (response.ok) {
        const docs = (await response.json()) as DOC[];

        const ul = create("ul");

        docs.forEach((doc) => {
          const ul2 = create("ul");
          const li = create("li");

          li.textContent = doc.name;
          doc.functions.forEach((func) => {
            const li2 = create("li");
            li2.textContent = func.name;

            extend(ul2, li2);
          });
          console.log(doc);

          extend(li, ul2);
          extend(ul, li);
        });

        extend(box, ul);
      }
      extend(box, box2);
    };

    const h1 = create("h1");

    h1.textContent = "Documentation";

    const link = new Link("Home Page 🏠", "/");
    const link2 = new Link("About ✨", "/about");

    const figa = create("img");
    figa.src = Figa.loadAsset("icons/figa-icon.png");

    extend(box, h1);

    cssClass(box2, "link-flex");

    extend(h1, figa);
    extend(box2, link);
    extend(box2, link2);

    cssClass(box, "about");

    loadDocs();

    return {
      element: box,
    };
  }
}
