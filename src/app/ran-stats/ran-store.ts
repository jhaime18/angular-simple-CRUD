import { computed, inject, Service, signal } from '@angular/core';

import { RanStat } from './ran-stat';
import { RanStatData } from './ran-data';

export type RanStatInput = Omit<RanStat, 'id'>;

@Service()
export class RanStatsStore {
  private readonly ranStatsData = inject(RanStatData);

  private readonly _ranStats = signal<RanStat[]>([]);
  private readonly _selectedRanStat = signal<RanStat | null>(null);
  private readonly _isLoading = signal(false);

  readonly ranStats = this._ranStats.asReadonly();
  readonly selectedRanStat = this._selectedRanStat.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly isEditing = computed(() => this._selectedRanStat() !== null);

  async loadRanStats(): Promise<void> {
    this._isLoading.set(true);
    const ranStats = await this.ranStatsData.getRanStats();
    this._ranStats.set(ranStats);
    this._isLoading.set(false);
  }

  async addRanStat(input: RanStatInput): Promise<void> {
    const ranStat = await this.ranStatsData.createRanStat(input);
    this._ranStats.update((ranStats) => [...ranStats, ranStat]);
  }

  async updateRanStat(id: string, input: RanStatInput): Promise<void> {
    const updatedRanStat = await this.ranStatsData.updateRanStat(id, input);

    if (!updatedRanStat) {
      return;
    }

    this._ranStats.update((ranStats) =>
      ranStats.map((ranStat) => (ranStat.id === id ? updatedRanStat : ranStat)),
    );

    this.clearSelection();
  }

  async deleteRanStat(id: string): Promise<void> {
    await this.ranStatsData.deleteRanStat(id);

    this._ranStats.update((ranStats) => ranStats.filter((ranStat) => ranStat.id !== id));
  }

  selectRanStat(id: string): void {
    const ranStat = this._ranStats().find((stat) => stat.id === id);

    this._selectedRanStat.set(ranStat ?? null);
  }

  clearSelection(): void {
    this._selectedRanStat.set(null);
  }
}
