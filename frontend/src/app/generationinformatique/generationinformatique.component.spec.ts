import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationinformatiqueComponent } from './generationinformatique.component';

describe('GenerationinformatiqueComponent', () => {
  let component: GenerationinformatiqueComponent;
  let fixture: ComponentFixture<GenerationinformatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationinformatiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationinformatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
