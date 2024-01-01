import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementshistoriquesComponent } from './evenementshistoriques.component';

describe('EvenementshistoriquesComponent', () => {
  let component: EvenementshistoriquesComponent;
  let fixture: ComponentFixture<EvenementshistoriquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementshistoriquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementshistoriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
