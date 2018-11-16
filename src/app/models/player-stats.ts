import { GameStats } from './game-stats';

export class PlayerStats {
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
