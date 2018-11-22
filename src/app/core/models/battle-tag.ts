export class BattleTag {
  name: string;
  region: Region;
  platform: Platform;

  static getKey(bt: BattleTag): string {
    return `${bt.name}:${bt.region.toLowerCase()}:${bt.platform.toLowerCase()}`;
  }

  static parseKey(key: string): BattleTag {
    const data = key.split(':', 3);

    return {
      name: data[0],
      region: data[1] as Region,
      platform: data[2] as Platform
    };
  }
}
