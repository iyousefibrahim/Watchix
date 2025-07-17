import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchTrailerComponent } from './watch-trailer.component';

describe('WatchTrailerComponent', () => {
  let component: WatchTrailerComponent;
  let fixture: ComponentFixture<WatchTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchTrailerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
