import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RanStatsPage } from './ran-stats-page';

describe('RanStatsPage', () => {
  let component: RanStatsPage;
  let fixture: ComponentFixture<RanStatsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RanStatsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RanStatsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
