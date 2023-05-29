import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDateComponent } from './popup-date.component';

describe('PopupDateComponent', () => {
  let component: PopupDateComponent;
  let fixture: ComponentFixture<PopupDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
