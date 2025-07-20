import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTvComponent } from './all-tv.component';

describe('AllTvComponent', () => {
  let component: AllTvComponent;
  let fixture: ComponentFixture<AllTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
