import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeasonCardComponent } from './tv-season-card.component';

describe('TvSeasonCardComponent', () => {
  let component: TvSeasonCardComponent;
  let fixture: ComponentFixture<TvSeasonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvSeasonCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvSeasonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
