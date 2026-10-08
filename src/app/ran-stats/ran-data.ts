import { Service } from '@angular/core';
import { RanStat } from './ran-stat';

type RanStatInput = Omit<RanStat, 'id'>;

@Service()
export class RanStatData {
  private readonly storageKey = 'ran-stats';

  async getRanStats(): Promise<RanStat[]> {
    const stored = localStorage.getItem(this.storageKey);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as RanStat[];
  }

  async createRanStat(input: RanStatInput): Promise<RanStat> {
    const ranStats = await this.getRanStats();

    const ranStat: RanStat = {
      id: crypto.randomUUID(),
      ...input,
    };

    ranStats.push(ranStat);

    this.saveRanStats(ranStats);
    return ranStat;
  }

  async updateRanStat(id: string, input: RanStatInput) {
    const ranStats = await this.getRanStats();

    const index = ranStats.findIndex((stat) => stat.id === id);

    if (index === -1) {
      return null;
    }

    const updateRanStat: RanStat = {
      id,
      ...input,
    };

    ranStats[index] = updateRanStat;

    this.saveRanStats(ranStats);
    return updateRanStat;
  }

  async deleteRanStat(id: string): Promise<void> {
    const ranStats = await this.getRanStats();

    const remainingRanStats = ranStats.filter((stat) => stat.id !== id);

    this.saveRanStats(remainingRanStats);
  }

  private saveRanStats(ranStats: RanStat[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(ranStats));
  }
}
