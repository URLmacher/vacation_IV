import type { Game } from './Game';
import { Layer } from './Layer';

export class Background {
  public image1: HTMLElement | null = null;
  public image2: HTMLElement | null = null;
  public image3: HTMLElement | null = null;
  public image4: HTMLElement | null = null;
  public layer1: Layer;
  public layer2: Layer;
  public layer3: Layer;
  public layer4: Layer;
  public layers: Layer[] = [];

  constructor(private game: Game) {
    this.image1 = document.getElementById('layer1');
    this.image2 = document.getElementById('layer2');
    this.image3 = document.getElementById('layer3');
    this.image4 = document.getElementById('layer4');
    this.layer1 = new Layer(this.game, this.image1 as HTMLImageElement, 0.2);
    this.layer2 = new Layer(this.game, this.image2 as HTMLImageElement, 0.4);
    this.layer3 = new Layer(this.game, this.image3 as HTMLImageElement, 1);
    this.layer4 = new Layer(this.game, this.image4 as HTMLImageElement, 1.5);
    this.layers = [this.layer1, this.layer2, this.layer3];
  }

  public update(): void {
    this.layers.forEach((layer) => layer.update());
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
