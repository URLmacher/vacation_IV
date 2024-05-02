export interface IDrawable {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface IAsset {
  path: string;
  key: string;
}

export interface IImageAsset extends IAsset {
  width: number;
  height: number;
}

export interface ISoundAsset extends IAsset {
  loop?: boolean;
}
