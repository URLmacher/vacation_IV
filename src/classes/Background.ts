import { EAsset } from '@/enums';
import type { Game } from './Game';
import { Layer } from './Layer';

export class Background {
  public image0: HTMLElement | null = null;
  public image1: HTMLElement | null = null;
  public image2: HTMLElement | null = null;
  public image3: HTMLElement | null = null;
  public image4: HTMLElement | null = null;
  public image5: HTMLElement | null = null;
  public layer0: Layer;
  public layer1: Layer;
  public layer2: Layer;
  public layer3: Layer;
  public layer4: Layer;
  public layer5: Layer;
  public layers: Layer[] = [];

  constructor(private game: Game) {
    this.image5 = document.getElementById(EAsset.LAYER5);
    this.image4 = document.getElementById(EAsset.LAYER4);
    this.image3 = document.getElementById(EAsset.LAYER3);
    this.image2 = document.getElementById(EAsset.LAYER2);
    this.image1 = document.getElementById(EAsset.LAYER1);
    this.image0 = document.getElementById(EAsset.LAYER0);

    this.layer5 = new Layer(
      this.game,
      this.image5 as HTMLImageElement,
      0.2,
      EAsset.LAYER5
    );
    this.layer4 = new Layer(
      this.game,
      this.image4 as HTMLImageElement,
      0.3,
      EAsset.LAYER4
    );
    this.layer2 = new Layer(
      this.game,
      this.image2 as HTMLImageElement,
      0.4,
      EAsset.LAYER2
    );
    this.layer3 = new Layer(
      this.game,
      this.image3 as HTMLImageElement,
      0.6,
      EAsset.LAYER3
    );
    this.layer1 = new Layer(
      this.game,
      this.image1 as HTMLImageElement,
      1.6,
      EAsset.LAYER1
    );
    this.layer0 = new Layer(
      this.game,
      this.image0 as HTMLImageElement,
      1.8,
      EAsset.LAYER0
    );

    this.layers = [
      this.layer5,
      this.layer4,
      this.layer3,
      this.layer2,
      this.layer1,
      this.layer0
    ];
  }

  public update(): void {
    this.layers.forEach((layer) => layer.update());
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
