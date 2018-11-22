import { GameStats } from './game-stats';

export class PlayerStats {
  region: Region;
  platform: Platform;
  icon: string;
  name: string;
  level: number;
  levelIcon: string;
  prestige: number;
  prestigeIcon: string;
  rating: number;
  ratingIcon: string;
  endorsementIcon: string;
  endorsement: number;
  quickPlayStats: GameStats;
  competitiveStats: GameStats;
}
