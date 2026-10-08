import { Component, effect, inject, computed, output } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RanStatsStore } from '../ran-store';

@Component({
  selector: 'app-ran-stat-form',
  imports: [ReactiveFormsModule],
  templateUrl: './ran-stat-form.html',
})
export class RanStatForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(RanStatsStore);

  readonly closed = output<void>();

  protected readonly form = this.formBuilder.nonNullable.group({
    date: ['', Validators.required],
    distance: [0, [Validators.required, Validators.min(0)]],
    duration: [0, [Validators.required, Validators.min(0)]],
    pace: [0, [Validators.required, Validators.min(0)]],
    remarks: this.formBuilder.control<string | null>(null),
  });

  protected readonly isEditing = computed(() => this.store.selectedRanStat() !== null);

  constructor() {
    effect(() => {
      const ranStat = this.store.selectedRanStat();

      if (ranStat) {
        this.form.setValue({
          date: ranStat.date,
          distance: ranStat.distance,
          duration: ranStat.duration,
          pace: ranStat.pace,
          remarks: ranStat.remarks,
        });

        return;
      }

      this.form.reset();
    });
  }

  protected async saveRanStat(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const ranStat = this.form.getRawValue();
    const selectedRanStat = this.store.selectedRanStat();

    if (selectedRanStat) {
      this.store.updateRanStat(selectedRanStat.id, ranStat);
    } else {
      await this.store.addRanStat(ranStat);
    }

    this.closed.emit();
  }

  protected cancel(): void {
    this.closed.emit();
  }
}
