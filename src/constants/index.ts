import { EEnemyType, EExplosionType } from '@/enums';
import type { IAsset } from '@/interfaces';

export const FONT_FAMILY: string = 'Bangers';

export const IMAGES: IAsset[] = [
  {
    key: 'layer1',
    path: '/images/layer1.png'
  },
  {
    key: 'layer2',
    path: '/images/layer2.png'
  },
  {
    key: 'layer3',
    path: '/images/layer3.png'
  },
  {
    key: 'layer4',
    path: '/images/layer4.png'
  },
  {
    key: EEnemyType.ONE,
    path: '/images/angler1.png'
  },
  {
    key: EEnemyType.TWO,
    path: '/images/angler2.png'
  },
  {
    key: EEnemyType.POWER_UP,
    path: '/images/lucky.png'
  },
  {
    key: EEnemyType.HIVE,
    path: '/images/hivewhale.png'
  },
  {
    key: 'player',
    path: '/images/player.png'
  },
  {
    key: EExplosionType.SMOKE,
    path: '/images/smokeExplosion.png'
  },
  {
    key: EExplosionType.FIRE,
    path: '/images/fireExplosion.png'
  },
  {
    key: 'projectile',
    path: '/images/projectile.png'
  },
  {
    key: 'particle',
    path: '/images/particle.png'
  }
];

export const DATES: string[] = [
  `2023-05-08T00:00:00.000Z`,
  `2023-05-17T00:00:00.000Z`,
  `2023-05-19T00:00:00.000Z`,
  `2023-05-22T00:00:00.000Z`,

  `2023-06-09T00:00:00.000Z`,
  `2023-06-12T00:00:00.000Z`,
  `2023-06-13T00:00:00.000Z`,
  `2023-06-14T00:00:00.000Z`,
  `2023-06-19T00:00:00.000Z`,
  `2023-06-26T00:00:00.000Z`,

  `2023-07-03T00:00:00.000Z`,
  `2023-07-10T00:00:00.000Z`,
  `2023-07-17T00:00:00.000Z`,
  `2023-07-18T00:00:00.000Z`,
  `2023-07-19T00:00:00.000Z`,
  `2023-07-20T00:00:00.000Z`,
  `2023-07-21T00:00:00.000Z`,
  `2023-07-24T00:00:00.000Z`,
  `2023-07-31T00:00:00.000Z`,

  `2023-08-07T00:00:00.000Z`,
  `2023-08-14T00:00:00.000Z`,
  `2023-08-21T00:00:00.000Z`,
  `2023-08-28T00:00:00.000Z`,

  `2023-09-04T00:00:00.000Z`,
  `2023-09-11T00:00:00.000Z`
].reverse();
