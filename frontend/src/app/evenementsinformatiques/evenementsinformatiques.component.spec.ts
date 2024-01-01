import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementsinformatiquesComponent } from './evenementsinformatiques.component';

describe('EvenementsinformatiquesComponent', () => {
  let component: EvenementsinformatiquesComponent;
  let fixture: ComponentFixture<EvenementsinformatiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementsinformatiquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementsinformatiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
