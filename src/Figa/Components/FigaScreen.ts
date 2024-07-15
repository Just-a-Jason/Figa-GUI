import FigaComponent from "./FigaComponent";
import { RouterOptions } from "../Router";

export default abstract class FigaScreen extends FigaComponent {
  public rendered(): void {}

  public animation(): RouterOptions | null {
    return null;
  }

  public refresh(): void {
    this.body = this.template();
  }
}
