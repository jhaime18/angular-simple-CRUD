import { Component, inject, signal } from '@angular/core';

import { RanStatForm } from '../ran-stat-form/ran-stat-form';
import { RanStatList } from '../ran-stat-list/ran-stat-list';
import { RanStatsStore } from '../ran-store';

@Component({
  selector: 'app-ran-stats-page',
  imports: [RanStatForm, RanStatList],
  styleUrl: './ran-stats-page.css',
  templateUrl: './ran-stats-page.html',
})
export class RanStatsPage {
  private readonly store = inject(RanStatsStore);
  protected readonly formOpen = signal(false);

  constructor() {
    this.loadRanStats();
  }

  protected openAddRanStat(): void {
    this.store.clearSelection();
    this.formOpen.set(true);
  }

  protected openEditRanStat(id: string): void {
    this.store.selectRanStat(id);
    this.formOpen.set(true);
  }

  protected closeForm(): void {
    this.store.clearSelection();
    this.formOpen.set(false);
  }

  protected deleteRanStat(id: string): void {
    this.store.deleteRanStat(id);
  }

  private async loadRanStats(): Promise<void> {
    await this.store.loadRanStats();
  }
}
