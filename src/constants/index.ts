import { EEnemyType, EExplosionType } from '@/enums';
import type { IAsset } from '@/interfaces';

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
    key: EEnemyType.DRONE,
    path: '/images/drone.png'
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
  },
];
