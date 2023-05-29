import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupStyleComponent } from './popup-style.component';

describe('PopupStyleComponent', () => {
  let component: PopupStyleComponent;
  let fixture: ComponentFixture<PopupStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
