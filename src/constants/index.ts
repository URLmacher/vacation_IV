import { EAsset, EEnemyType, EExplosionType } from '@/enums';
import type { IAsset } from '@/interfaces';

export const FONT_FAMILY: string = 'ethnocentric';

export const IMAGES: IAsset[] = [
  {
    key:EAsset.LAYER5,
    path: '/images/layer_5.png',
    width: 1768,
    height: 884
  },
  {
    key:EAsset.LAYER4,
    path: '/images/layer_4.png',
    width: 1768,
    height: 884
  },
  {
    key:EAsset.LAYER3,
    path: '/images/layer_3.png',
    width: 1768,
    height: 884
  },
  {
    key:EAsset.LAYER2,
    path: '/images/layer_2.png',
    width: 1768,
    height: 884
  },
  {
    key:EAsset.LAYER1,
    path: '/images/layer_1.png',
    width: 1768,
    height: 884
  },
  {
    key:EAsset.LAYER0,
    path: '/images/layer_0.png',
    width: 1768,
    height: 884
  },
  {
    key: EEnemyType.ONE,
    path: '/images/ship_green.png',
    width: 263,
    height: 88
  },
  {
    key: EEnemyType.TWO,
    path: '/images/ship_pink.png',
    width: 232,
    height: 142
  },
  {
    key: EEnemyType.THREE,
    path: '/images/ship_white.png',
    width: 253,
    height: 112
  },
  {
    key: EEnemyType.POWER_UP,
    path: '/images/ship_red.png',
    width: 217,
    height: 86
  },
  {
    key: EEnemyType.HIVE,
    path: '/images/ship_yellow.png',
    width: 229,
    height: 108
  },
  {
    key: EAsset.PLAYER,
    path: '/images/ship_blue.png',
    width: 150,
    height: 96
  },
  {
    key: EExplosionType.SMOKE,
    path: '/images/smokeExplosion.png',
    width: 1600,
    height: 200
  },
  {
    key: EExplosionType.FIRE,
    path: '/images/fireExplosion.png',
    width: 1600,
    height: 200
  },
  {
    key: EAsset.PROJECTILE,
    path: '/images/projectile.png',
    width: 28,
    height: 10
  },
];

export const DATES: string[] = [
  `2023-05-08T00:00:00.000Z`,
  `2023-05-17T00:00:00.000Z`,
  `2023-05-19T00:00:00.000Z`,
  `2023-05-22T00:00:00.000Z`

  // `2023-06-09T00:00:00.000Z`,
  // `2023-06-12T00:00:00.000Z`,
  // `2023-06-13T00:00:00.000Z`,
  // `2023-06-14T00:00:00.000Z`,
  // `2023-06-19T00:00:00.000Z`,
  // `2023-06-26T00:00:00.000Z`,

  // `2023-07-03T00:00:00.000Z`,
  // `2023-07-10T00:00:00.000Z`,
  // `2023-07-17T00:00:00.000Z`,
  // `2023-07-18T00:00:00.000Z`,
  // `2023-07-19T00:00:00.000Z`,
  // `2023-07-20T00:00:00.000Z`,
  // `2023-07-21T00:00:00.000Z`,
  // `2023-07-24T00:00:00.000Z`,
  // `2023-07-31T00:00:00.000Z`,

  // `2023-08-07T00:00:00.000Z`,
  // `2023-08-14T00:00:00.000Z`,
  // `2023-08-21T00:00:00.000Z`,
  // `2023-08-28T00:00:00.000Z`,

  // `2023-09-04T00:00:00.000Z`,
  // `2023-09-11T00:00:00.000Z`
].reverse();

export const TEXTS: Record<string, string> = {
  allConfirmed: 'Alles bestätigt',
  btnText: 'Jetzt bestätigen',
  btnTextRoundTwo: 'Erneut bestätigen',
  toConfirm: 'Zu bestätigen:',
  thanks: 'Danks',
  vacationTitle: 'Urlaubsantrag',
  vacationYear: '2024'
};
