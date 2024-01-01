import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceesComponent } from './avancees.component';

describe('AvanceesComponent', () => {
  let component: AvanceesComponent;
  let fixture: ComponentFixture<AvanceesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvanceesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvanceesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
