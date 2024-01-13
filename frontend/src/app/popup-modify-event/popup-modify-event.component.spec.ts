import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModifyEventComponent } from './popup-modify-event.component';

describe('PopupModifyEventComponent', () => {
  let component: PopupModifyEventComponent;
  let fixture: ComponentFixture<PopupModifyEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupModifyEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModifyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
