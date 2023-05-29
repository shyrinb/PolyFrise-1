import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddEventComponent } from './popup-add-event.component';

describe('PopupAddEventComponent', () => {
  let component: PopupAddEventComponent;
  let fixture: ComponentFixture<PopupAddEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
