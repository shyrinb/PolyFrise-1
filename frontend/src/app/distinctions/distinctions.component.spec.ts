import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistinctionsComponent } from './distinctions.component';

describe('DistinctionsComponent', () => {
  let component: DistinctionsComponent;
  let fixture: ComponentFixture<DistinctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistinctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistinctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
