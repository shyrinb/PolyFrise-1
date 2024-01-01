import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalitesComponent } from './personnalites.component';

describe('PersonnalitesComponent', () => {
  let component: PersonnalitesComponent;
  let fixture: ComponentFixture<PersonnalitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnalitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnalitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
