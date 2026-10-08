import { Component, inject, output } from '@angular/core';

import { RanStatsStore } from '../ran-store';

@Component({
  selector: 'app-ran-stat-list',
  templateUrl: './ran-stat-list.html',
})
export class RanStatList {
  protected readonly store = inject(RanStatsStore);

  readonly editRequested = output<string>();
  readonly deleteRequested = output<string>();

  protected editRanStat(id: string): void {
    this.editRequested.emit(id);
  }

  protected deleteRanStat(id: string): void {
    this.deleteRequested.emit(id);
  }
}
